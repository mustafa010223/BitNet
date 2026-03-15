import type { Building, SimulationConfig } from '../types';
import { BuildingType } from '../types';
import { SIMULATION_DEFAULTS, BUILDING_COLORS } from '../constants';

interface GridCell {
  x: number;
  z: number;
  occupied: boolean;
  type: 'building' | 'road' | 'park' | 'empty';
}

class CityGeneratorService {
  private grid: GridCell[][] = [];
  private config: SimulationConfig;
  private buildings: Building[] = [];

  constructor() {
    this.config = this.getDefaultConfig();
  }

  generate(config?: Partial<SimulationConfig>): Building[] {
    this.config = { ...this.getDefaultConfig(), ...config };
    this.initializeGrid();
    this.generateRoadNetwork();
    this.generateBuildings();
    this.generateParks();

    return this.buildings;
  }

  private getDefaultConfig(): SimulationConfig {
    return {
      citySize: SIMULATION_DEFAULTS.CITY_SIZE,
      buildingDensity: SIMULATION_DEFAULTS.BUILDING_DENSITY,
      mixedUse: true,
      greenSpaceRatio: SIMULATION_DEFAULTS.GREEN_SPACE_RATIO,
      roadNetwork: {
        gridSize: SIMULATION_DEFAULTS.GRID_SIZE,
        roadWidth: SIMULATION_DEFAULTS.ROAD_WIDTH,
        intersections: true,
        highways: true,
      },
      zoning: {
        residential: 0.35,
        commercial: 0.25,
        industrial: 0.15,
        mixed: 0.15,
        public: 0.10,
      },
    };
  }

  private initializeGrid(): void {
    const gridSize = Math.floor(this.config.citySize / this.config.roadNetwork.gridSize);
    this.grid = [];

    for (let x = 0; x < gridSize; x++) {
      this.grid[x] = [];
      for (let z = 0; z < gridSize; z++) {
        this.grid[x][z] = {
          x: x * this.config.roadNetwork.gridSize,
          z: z * this.config.roadNetwork.gridSize,
          occupied: false,
          type: 'empty',
        };
      }
    }
  }

  private generateRoadNetwork(): void {
    const gridSize = this.grid.length;
    const roadInterval = 3;

    for (let x = 0; x < gridSize; x++) {
      for (let z = 0; z < gridSize; z++) {
        if (x % roadInterval === 0 || z % roadInterval === 0) {
          if (this.grid[x] && this.grid[x][z]) {
            this.grid[x][z].occupied = true;
            this.grid[x][z].type = 'road';
          }
        }
      }
    }

    if (this.config.roadNetwork.highways) {
      this.generateHighways();
    }
  }

  private generateHighways(): void {
    const gridSize = this.grid.length;
    const midpoint = Math.floor(gridSize / 2);

    for (let i = 0; i < gridSize; i++) {
      if (this.grid[midpoint] && this.grid[midpoint][i]) {
        this.grid[midpoint][i].occupied = true;
        this.grid[midpoint][i].type = 'road';
      }
      if (this.grid[i] && this.grid[i][midpoint]) {
        this.grid[i][midpoint].occupied = true;
        this.grid[i][midpoint].type = 'road';
      }
    }
  }

  private generateBuildings(): void {
    this.buildings = [];
    const totalCells = this.grid.length * this.grid[0].length;
    const targetBuildings = Math.floor(totalCells * this.config.buildingDensity);
    let buildingsCreated = 0;

    const buildingTypes = this.calculateBuildingDistribution();

    for (let x = 0; x < this.grid.length; x++) {
      for (let z = 0; z < this.grid[x].length; z++) {
        if (buildingsCreated >= targetBuildings) break;

        const cell = this.grid[x][z];
        if (!cell.occupied && Math.random() < 0.7) {
          const type = this.selectBuildingType(buildingTypes, x, z);
          const building = this.createBuilding(cell, type);

          this.buildings.push(building);
          cell.occupied = true;
          cell.type = 'building';
          buildingsCreated++;
        }
      }
    }
  }

  private calculateBuildingDistribution(): Map<BuildingType, number> {
    const distribution = new Map<BuildingType, number>();
    const zoning = this.config.zoning;

    distribution.set(BuildingType.RESIDENTIAL, zoning.residential);
    distribution.set(BuildingType.COMMERCIAL, zoning.commercial);
    distribution.set(BuildingType.INDUSTRIAL, zoning.industrial);
    distribution.set(BuildingType.MIXED_USE, zoning.mixed);
    distribution.set(BuildingType.PUBLIC, zoning.public);

    return distribution;
  }

  private selectBuildingType(
    _distribution: Map<BuildingType, number>,
    x: number,
    z: number
  ): BuildingType {
    const centerX = this.grid.length / 2;
    const centerZ = this.grid[0].length / 2;
    const distanceFromCenter = Math.sqrt(
      Math.pow(x - centerX, 2) + Math.pow(z - centerZ, 2)
    );
    const maxDistance = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerZ, 2));
    const normalizedDistance = distanceFromCenter / maxDistance;

    if (normalizedDistance < 0.3) {
      return this.weightedRandom([
        [BuildingType.COMMERCIAL, 0.5],
        [BuildingType.OFFICE, 0.3],
        [BuildingType.MIXED_USE, 0.2],
      ] as [BuildingType, number][]);
    } else if (normalizedDistance < 0.6) {
      return this.weightedRandom([
        [BuildingType.RESIDENTIAL, 0.4],
        [BuildingType.MIXED_USE, 0.3],
        [BuildingType.COMMERCIAL, 0.2],
        [BuildingType.OFFICE, 0.1],
      ] as [BuildingType, number][]);
    } else {
      return this.weightedRandom([
        [BuildingType.RESIDENTIAL, 0.5],
        [BuildingType.INDUSTRIAL, 0.3],
        [BuildingType.PUBLIC, 0.2],
      ] as [BuildingType, number][]);
    }
  }

  private weightedRandom(weights: [BuildingType, number][]): BuildingType {
    const totalWeight = weights.reduce((sum, [, weight]) => sum + weight, 0);
    let random = Math.random() * totalWeight;

    for (const [type, weight] of weights) {
      random -= weight;
      if (random <= 0) return type;
    }

    return weights[0][0];
  }

  private createBuilding(cell: GridCell, type: BuildingType): Building {
    const baseHeight = SIMULATION_DEFAULTS.MIN_BUILDING_HEIGHT;
    const maxHeight = SIMULATION_DEFAULTS.MAX_BUILDING_HEIGHT;

    let height: number;
    switch (type) {
      case BuildingType.OFFICE:
        height = baseHeight + Math.random() * (maxHeight - baseHeight) * 0.8;
        break;
      case BuildingType.COMMERCIAL:
        height = baseHeight + Math.random() * (maxHeight - baseHeight) * 0.5;
        break;
      case BuildingType.RESIDENTIAL:
        height = baseHeight + Math.random() * (maxHeight - baseHeight) * 0.6;
        break;
      case BuildingType.INDUSTRIAL:
        height = baseHeight * 0.6;
        break;
      case BuildingType.PUBLIC:
        height = baseHeight + Math.random() * (maxHeight - baseHeight) * 0.4;
        break;
      default:
        height = baseHeight + Math.random() * (maxHeight - baseHeight) * 0.7;
    }

    const width = 4 + Math.random() * 4;
    const depth = 4 + Math.random() * 4;

    return {
      id: `building-${cell.x}-${cell.z}`,
      position: [
        cell.x - this.config.citySize / 2,
        height / 2,
        cell.z - this.config.citySize / 2,
      ],
      size: [width, height, depth],
      type,
      color: BUILDING_COLORS[type as keyof typeof BUILDING_COLORS] || '#3b82f6',
      residents: type === BuildingType.RESIDENTIAL ? Math.floor(height * 15) : undefined,
      employees: type === BuildingType.COMMERCIAL || type === BuildingType.OFFICE ? Math.floor(height * 20) : undefined,
      energyConsumption: Math.floor(width * depth * height * 0.5),
      metadata: {
        floors: Math.floor(height / 3),
        yearBuilt: 2020 + Math.floor(Math.random() * 5),
        occupancyRate: 0.7 + Math.random() * 0.3,
        sustainabilityRating: Math.floor(Math.random() * 5) + 1,
      },
    };
  }

  private generateParks(): void {
    const targetParks = Math.floor(
      this.grid.length * this.grid[0].length * this.config.greenSpaceRatio
    );
    let parksCreated = 0;

    for (let x = 0; x < this.grid.length; x++) {
      for (let z = 0; z < this.grid[x].length; z++) {
        if (parksCreated >= targetParks) break;

        const cell = this.grid[x][z];
        if (!cell.occupied && Math.random() < 0.1) {
          const park: Building = {
            id: `park-${cell.x}-${cell.z}`,
            position: [
              cell.x - this.config.citySize / 2,
              0.2,
              cell.z - this.config.citySize / 2,
            ],
            size: [8, 0.4, 8],
            type: BuildingType.RECREATION,
            color: BUILDING_COLORS.recreation,
            metadata: {
              name: 'City Park',
              amenities: ['playground', 'benches', 'trees'],
            },
          };

          this.buildings.push(park);
          cell.occupied = true;
          cell.type = 'park';
          parksCreated++;
        }
      }
    }
  }

  getCityMetrics() {
    const totalBuildings = this.buildings.filter(b => b.type !== 'recreation').length;
    const totalResidents = this.buildings
      .filter(b => b.residents)
      .reduce((sum, b) => sum + (b.residents || 0), 0);
    const totalEmployees = this.buildings
      .filter(b => b.employees)
      .reduce((sum, b) => sum + (b.employees || 0), 0);
    const totalEnergy = this.buildings
      .reduce((sum, b) => sum + (b.energyConsumption || 0), 0);

    const typeCount: Record<string, number> = {};
    this.buildings.forEach(b => {
      typeCount[b.type] = (typeCount[b.type] || 0) + 1;
    });

    return {
      totalBuildings,
      totalResidents,
      totalEmployees,
      totalEnergy,
      buildingsByType: typeCount,
      citySize: this.config.citySize,
      coverage: (totalBuildings / (this.grid.length * this.grid[0].length)) * 100,
    };
  }
}

export const cityGeneratorService = new CityGeneratorService();

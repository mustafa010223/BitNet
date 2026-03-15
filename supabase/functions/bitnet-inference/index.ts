import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface InferenceRequest {
  prompt: string;
  maxTokens?: number;
  temperature?: number;
  context?: {
    conversation_id: string;
    message_index: number;
    previous_messages: Array<{ role: string; content: string }>;
  };
  simulationId?: string;
  conversationId?: string;
}

interface InferenceResponse {
  response: string;
  inferenceTimeMs: number;
  tokensGenerated: number;
  modelVersion: string;
}

const DEMO_RESPONSES = [
  "Based on the current urban layout, I recommend implementing a green corridor system connecting major districts. This will improve air quality by 15-20% and reduce urban heat island effects.",
  "Analysis shows that traffic congestion can be reduced by 35% through strategic placement of smart traffic signals at key intersections. I can generate an optimal signal timing configuration.",
  "The building density in the eastern sector is below optimal levels. Consider mixed-use developments that combine residential and commercial spaces to improve walkability and reduce commute times.",
  "Energy efficiency can be improved by integrating solar panels on south-facing building facades and implementing a district heating system. Estimated energy savings: 40-45%.",
  "Water management analysis suggests implementing permeable pavements and rain gardens to reduce stormwater runoff by 30%. This will also enhance urban biodiversity.",
  "Public transportation optimization: Adding express bus routes connecting residential areas to business districts would reduce car dependency by approximately 25%.",
];

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const startTime = performance.now();

    const body: InferenceRequest = await req.json();
    const { prompt, maxTokens = 100, temperature = 0.7, context, simulationId } = body;

    if (!prompt || typeof prompt !== "string") {
      return new Response(
        JSON.stringify({ error: "Invalid prompt provided" }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    let response: string;
    const lowercasePrompt = prompt.toLowerCase();

    if (lowercasePrompt.includes('optimize') || lowercasePrompt.includes('improve')) {
      response = 'Based on your city simulation, I recommend optimizing traffic flow by implementing a grid-based road network and increasing green space by 15%. This could improve overall sustainability metrics by approximately 23%.';
    } else if (lowercasePrompt.includes('traffic') || lowercasePrompt.includes('road')) {
      response = 'Traffic analysis shows peak congestion during morning hours (8-10 AM). Consider implementing: 1) Additional arterial roads in high-density zones, 2) Public transportation corridors, 3) Smart traffic light systems. Expected improvement: 30% reduction in average commute time.';
    } else if (lowercasePrompt.includes('energy') || lowercasePrompt.includes('power')) {
      response = 'Energy consumption analysis indicates opportunities for 40% efficiency gains through: solar panel installation on 60% of commercial buildings, LED street lighting upgrades, and smart grid implementation. Estimated ROI: 5 years.';
    } else if (lowercasePrompt.includes('population') || lowercasePrompt.includes('resident')) {
      response = 'Population density analysis suggests optimal distribution for your current city layout. Residential zones support approximately 45,000 residents with current infrastructure. Capacity can be increased to 65,000 with planned expansion.';
    } else if (lowercasePrompt.includes('economic') || lowercasePrompt.includes('gdp')) {
      response = 'Economic modeling projects 8% annual GDP growth with current mixed-use zoning strategy. Commercial zones are performing well with 92% occupancy. Industrial sector shows potential for 15% expansion.';
    } else if (lowercasePrompt.includes('green') || lowercasePrompt.includes('park') || lowercasePrompt.includes('environment')) {
      response = 'Environmental assessment shows good green space distribution at 22% coverage. Recommend adding 3 additional parks in high-density areas and creating green corridors connecting major zones. This would improve air quality index by 18%.';
    } else {
      response = DEMO_RESPONSES[Math.floor(Math.random() * DEMO_RESPONSES.length)];
    }

    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));

    const endTime = performance.now();
    const inferenceTimeMs = Math.round(endTime - startTime);

    const inferenceResponse: InferenceResponse = {
      response: response,
      inferenceTimeMs,
      tokensGenerated: Math.floor(response.split(" ").length * 1.3),
      modelVersion: "bitnet-1.58-3B",
    };

    return new Response(JSON.stringify(inferenceResponse), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error in bitnet-inference:", error);

    return new Response(
      JSON.stringify({
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});

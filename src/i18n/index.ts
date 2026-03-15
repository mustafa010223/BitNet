import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      app: {
        title: 'BitNet City3D Intelligence Platform',
        subtitle: 'AI-Powered Urban Planning',
      },
      nav: {
        city: 'City View',
        dashboard: 'Dashboard',
      },
      ai: {
        title: 'BitNet AI Assistant',
        subtitle: 'Powered by 1.58-bit LLM',
        placeholder: 'Ask about city planning...',
        welcome: 'Hello! I am your BitNet-powered city planning assistant. I can help you analyze urban patterns, suggest optimizations, and generate city scenarios. How can I help you today?',
        thinking: 'Analyzing with BitNet...',
        clear: 'Clear conversation',
      },
      building: {
        details: 'Building Details',
        type: 'Type',
        width: 'Width',
        height: 'Height',
        residents: 'Residents',
        employees: 'Employees',
        energy: 'Energy Usage',
        floors: 'Floors',
        built: 'Built',
        occupancy: 'Occupancy Rate',
      },
      controls: {
        title: 'City Controls',
        rotate: 'Left click + drag to rotate',
        pan: 'Right click + drag to pan',
        zoom: 'Scroll to zoom',
      },
      dashboard: {
        title: 'Analytics Dashboard',
        performance: 'Performance Metrics',
        energy: 'Energy Consumption',
        population: 'Population Distribution',
      },
      notifications: {
        success: 'Success',
        error: 'Error',
        warning: 'Warning',
        info: 'Information',
      },
    },
  },
  tr: {
    translation: {
      app: {
        title: 'BitNet City3D Zeka Platformu',
        subtitle: 'Yapay Zeka Destekli Şehir Planlama',
      },
      nav: {
        city: 'Şehir Görünümü',
        dashboard: 'Gösterge Paneli',
      },
      ai: {
        title: 'BitNet Yapay Zeka Asistanı',
        subtitle: '1.58-bit LLM ile güçlendirilmiş',
        placeholder: 'Şehir planlaması hakkında sorun...',
        welcome: 'Merhaba! BitNet destekli şehir planlama asistanınızım. Kentsel kalıpları analiz etmenize, optimizasyonlar önermeme ve şehir senaryoları oluşturmanıza yardımcı olabilirim. Size nasıl yardımcı olabilirim?',
        thinking: 'BitNet ile analiz ediliyor...',
        clear: 'Konuşmayı temizle',
      },
      building: {
        details: 'Bina Detayları',
        type: 'Tür',
        width: 'Genişlik',
        height: 'Yükseklik',
        residents: 'Sakinler',
        employees: 'Çalışanlar',
        energy: 'Enerji Kullanımı',
        floors: 'Katlar',
        built: 'İnşa Yılı',
        occupancy: 'Doluluk Oranı',
      },
      controls: {
        title: 'Şehir Kontrolleri',
        rotate: 'Döndürmek için sol tıklayıp sürükleyin',
        pan: 'Kaydırmak için sağ tıklayıp sürükleyin',
        zoom: 'Yakınlaştırmak için kaydırın',
      },
      dashboard: {
        title: 'Analitik Paneli',
        performance: 'Performans Metrikleri',
        energy: 'Enerji Tüketimi',
        population: 'Nüfus Dağılımı',
      },
      notifications: {
        success: 'Başarılı',
        error: 'Hata',
        warning: 'Uyarı',
        info: 'Bilgi',
      },
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

import id1 from "@/assets/education/image/id1-image.png";
import { StaticImageData } from "next/image";

export interface EducationItem {
  id: string;
  title?: string;
  image?: StaticImageData;
  description: string;
  content?: {
    introduction: string;
    sections: {
      title: string;
      content: string;
    }[];
  };
}

export const educationData: EducationItem[] = [
  {
    id: "basic-value-investing-1",
    title: "Apa Itu Value Of Investing?",
    image: id1,
    description:
      "Value investing adalah metode membeli saham dengan harga bawah atau yang sering disebut dengan undervalue, dan dijual saat harganya sudah wajar.",
    content: {
      introduction:
        "Value investing adalah metode membeli saham dengan harga bawah atau yang sering disebut dengan undervalue, dan dijual saat harganya sudah wajar. Harga beli dianggap tidak wajar, karena sebenarnya perusahaan itu memiliki fundamental yang baik.",
      sections: [
        {
          title: "Apa Itu Value Of Investing?",
          content:
            "Dengan begitu, value investing tidak sekadar membeli saham dengan harga murah saja. Sebaliknya, investor harus melakukan analisis terlebih dulu terkait harga dan perusahaan, termasuk membaca laporan keuangannya.",
        },
        {
          title: "",
          content:
            "Insting seorang value investor akan aktif ketika melihat laporan keuangan perusahaan sebenarnya bagus, namun sahamnya dijual dengan harga murah. Dari situ, value investor akan yakin suatu saat harga saham ini akan naik dan memutuskan untuk investasi di sana.",
        },
        {
          title: "",
          content:
            "Untuk memulai strategi ini, kamu harus mencari saham yang “salah harga” berdasarkan laporan keuangannya. Kamu perlu melakukan teknik analisa investasi top-down, yaitu mulai dari fundamental perusahaan lalu mengamati pergerakan saham dan daya beli masyarakat.",
        },
      ],
    },
  },
  {
    id: "basic-value-investing-2",
    title: "Money Management",
    image: id1,
    description:
      "Pernahkah Anda merasa gaji hanya numpang lewat? Atau bingung ke mana perginya semua uang di akhir bulan? Jawabannya sering kali terletak pada satu keahlian penting: money management.",
    content: {
      introduction:
        "Pernahkah Anda merasa gaji hanya numpang lewat? Atau bingung ke mana perginya semua uang di akhir bulan? Jawabannya sering kali terletak pada satu keahlian penting: money management.",
      sections: [
        {
          title: "Money Management Tips",
          content:
            "Pada dasarnya, money management adalah seni untuk mengambil alih kendali penuh atas keuangan Anda, mulai dari perencanaan, pengelolaan, hingga pengawasan demi mencapai tujuan hidup yang lebih besar. Ini bukan sekadar tentang berhenti boros, tetapi sebuah strategi cerdas untuk memaksimalkan potensi setiap rupiah agar dapat memberikan manfaat jangka panjang. Prosesnya melibatkan berbagai aktivitas penting seperti menyusun anggaran untuk memberi arah pada uang Anda, disiplin menabung dan berinvestasi untuk membangun masa depan, serta cermat melacak pengeluaran agar Anda selalu sadar akan kesehatan finansial Anda.",
        },
        {
          title: "",
          content:
            "Keahlian ini sangat vital di berbagai skala. Dalam keuangan pribadi, ini menjadi kunci untuk mengatur anggaran rumah tangga, melunasi utang, dan membangun kekayaan secara bertahap. Sementara itu, dalam konteks bisnis, money management adalah jantung yang memompa kehidupan perusahaan, memastikan arus kas tetap sehat, mengendalikan modal, serta mengelola aset agar terus bertumbuh dan menghasilkan keuntungan.",
        },
      
      ],
    },
  },
  {
    id: "advanced-portfolio-management",
    title: "Dana Darurat",
    image: id1,
    description:
      "Membangun dana darurat adalah langkah penting dalam perencanaan keuangan untuk mengatasi pengeluaran tak terduga, seperti kehilangan pekerjaan, biaya medis mendadak, atau perbaikan darurat.",
    content: {
      introduction:
        "",
      sections: [
        {
          title: "Membangun Dana Darurat",
          content:
            "Membangun dana darurat adalah langkah penting dalam perencanaan keuangan untuk mengatasi pengeluaran tak terduga, seperti kehilangan pekerjaan, biaya medis mendadak, atau perbaikan darurat. Berikut adalah panduan langkah demi langkah untuk membangun dana darurat Anda.",
        },
        {
          title: "1. Tentukan target dana darurat ",
          content:
            "Jumlah ideal dana darurat berbeda-beda tergantung status dan tanggungan Anda.Lajang: 3–6 kali pengeluaran bulanan.Menikah tanpa anak: 6 kali pengeluaran bulanan.Menikah dengan 1 anak: 9 kali pengeluaran bulanan.Menikah dengan 2 anak atau lebih: 12 kali pengeluaran bulanan.Wirausaha: 12 kali pengeluaran bulanan, karena pendapatan cenderung tidak tetap.",
        },
        {
          title: "2. Buat anggaran yang terperinci",
          content:
            "Periksa kembali anggaran bulanan Anda untuk mengetahui dengan jelas ke mana uang Anda pergi. Identifikasi pengeluaran yang tidak penting, seperti langganan yang jarang digunakan atau kebiasaan makan di luar, yang bisa dialokasikan untuk dana darurat. ",
        },
        {
          title: "3. Otomatiskan tabungan Anda",
          content:
            "Salah satu cara paling efektif adalah dengan mengotomatiskan tabungan Anda. Atur transfer otomatis dari rekening gaji Anda ke rekening dana darurat setiap bulan, segera setelah gajian. Perlakukan tabungan ini layaknya tagihan wajib lainnya. Anda bisa memulai dengan jumlah kecil, misalnya 5% atau 10% dari gaji, dan tingkatkan secara bertahap.",
        },
        {
          title: "4. Simpan di tempat yang tepat",
          content:
            "Pilih rekening tabungan terpisah yang mudah diakses namun tidak terlalu mudah tergoda untuk digunakan. Hindari menyimpan dana darurat di rekening investasi atau pasar uang yang mungkin mengalami fluktuasi nilai.",
        },
          {
          title: "5. Manfaatkan pendapatan tambahan",
          content:
            "Jika Anda menerima bonus, THR, atau penghasilan tambahan lainnya, alokasikan sebagian besar atau seluruhnya langsung ke dana darurat Anda untuk mempercepat pencapaian target. ",
        },
          {
          title: "6. Kelola pengeluaran ekstra",
          content:
            "Saat menghadapi situasi darurat dan terpaksa menggunakan dana darurat, segera isi kembali setelah situasi berlalu. Selalu prioritaskan pengisian ulang dana darurat sebagai tujuan finansial utama",
        },
          {
          title: "7. Periksa secara berkala",
          content:
            "Kebutuhan dana darurat dapat berubah seiring waktu. Jika Anda memiliki anak, membeli rumah, atau terjadi perubahan besar dalam hidup Anda, evaluasi kembali jumlah yang dibutuhkan dan sesuaikan target Anda.",
        },
      ],
    },
  },
  {
    id: "market-analysis-fundamentals",
    title: "Financial Freedom",
    image: id1,
    description:
      "Understanding market trends and economic indicators is crucial for successful investing. Learn technical and fundamental analysis techniques from industry experts.",
    content: {
      introduction:
        "Master the essential skills of market analysis with comprehensive training in both technical and fundamental analysis. Understanding market trends, economic indicators, and company valuations is crucial for successful investing. Learn proven techniques from industry experts and develop the analytical skills needed to make informed investment decisions.",
      sections: [
        {
          title: "Apa itu Financial Freedom? ",
          content:
            "Market analysis combines both technical and fundamental approaches to evaluate investment opportunities. Technical analysis focuses on price patterns, trading volumes, and market sentiment indicators, while fundamental analysis examines economic factors, company financials, and industry trends. This comprehensive approach enables investors to make more informed decisions by understanding both the quantitative and qualitative aspects of market movements.",
        },
        {
          title: "Economic Indicators and Market Cycles",
          content:
            "Understanding macroeconomic indicators is essential for predicting market movements and identifying investment opportunities. This section covers leading, lagging, and coincident indicators such as GDP growth, unemployment rates, inflation data, and central bank policies. Students will learn how these indicators influence different asset classes and how to use economic data to time market entries and exits. The course also explores market cycles, including bull and bear markets, and how to position portfolios accordingly.",
        },
        {
          title: "Chart Patterns and Technical Indicators",
          content:
            "Technical analysis relies on chart patterns and mathematical indicators to predict future price movements. Students will learn to identify common patterns such as head and shoulders, triangles, and flag formations. The course covers popular technical indicators including moving averages, RSI, MACD, and Bollinger Bands. Practical exercises will teach students how to combine multiple indicators to generate trading signals and how to set appropriate stop-loss and take-profit levels.",
        },
        {
          title: "Industry and Sector Analysis",
          content:
            "Different industries and sectors perform differently under various economic conditions. This section teaches students how to analyze industry trends, competitive dynamics, and regulatory environments that affect sector performance. Students will learn to identify which sectors tend to outperform during different phases of the economic cycle and how to use sector rotation strategies to enhance portfolio returns. The course also covers how to evaluate industry-specific metrics and ratios.",
        },
        {
          title: "Market Sentiment and Behavioral Finance",
          content:
            "Market sentiment plays a crucial role in short-term price movements and can create opportunities for contrarian investors. This section explores behavioral finance concepts such as herding behavior, loss aversion, and confirmation bias. Students will learn how to measure market sentiment using indicators like the VIX, put-call ratios, and insider trading data. Understanding these psychological factors helps investors avoid common behavioral traps and capitalize on market inefficiencies caused by emotional decision-making.",
        },
        {
          title: "Global Markets and Currency Analysis",
          content:
            "In today's interconnected world, understanding global markets and currency movements is essential for comprehensive market analysis. This section covers how international events, trade policies, and currency fluctuations affect domestic markets. Students will learn to analyze foreign exchange rates, understand the impact of global economic policies, and identify opportunities in international markets. The course also addresses the risks and benefits of international diversification and currency hedging strategies.",
        },
      ],
    },
  },
];

import id1 from "@/assets/education/image/id1-image.png";
import { StaticImageData } from "next/image";

export interface EducationItem {
  id: string;
  title: string;
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
    title: "Basic Value Investing",
    image: id1,
    description: "Exposing your inventory to incidents is a thing of the past. We have a professional insurance policy that protects all your items against damage and theft.",
    content: {
      introduction: "Value investing is one of the most proven investment strategies in financial history. Learn the fundamental principles that have made legendary investors like Warren Buffett and Benjamin Graham successful, and discover how to build long-term wealth through strategic investment decisions.",
      sections: [
        {
          title: "Value Of Investing",
          content: "Value investing is a time-tested investment strategy that focuses on buying undervalued securities and holding them for the long term. This approach, popularized by legendary investors like Benjamin Graham and Warren Buffett, emphasizes thorough fundamental analysis and patience. By understanding the intrinsic value of companies and purchasing their stocks when they trade below this value, investors can achieve superior returns while minimizing risk. The key principles include focusing on company fundamentals, maintaining a long-term perspective, and having the discipline to stick to your investment thesis even during market volatility."
        },
        {
          title: "Understanding Market Psychology",
          content: "One of the core advantages of value investing is its ability to capitalize on market inefficiencies caused by emotional decision-making. Markets often overreact to both positive and negative news, creating opportunities for disciplined investors. When fear dominates the market, quality stocks may trade below their intrinsic value. Conversely, during periods of euphoria, stocks may become overvalued. Understanding these psychological cycles allows value investors to buy when others are selling and remain patient when others are chasing trends."
        },
        {
          title: "Financial Statement Analysis",
          content: "Successful value investing requires the ability to analyze financial statements thoroughly. This includes understanding income statements, balance sheets, and cash flow statements. Key metrics to focus on include price-to-earnings ratios, price-to-book ratios, debt-to-equity ratios, and free cash flow generation. Additionally, investors should look for companies with strong competitive advantages, experienced management teams, and sustainable business models. The goal is to identify companies that are financially sound but temporarily undervalued by the market."
        }
      ]
    }
  },
  {
    id: "basic-value-investing-2", 
    title: "Basic Value Investing",
    image: "/assets/education/portfolio-analysis.jpg",
    description: "Learn the fundamental principles of value investing and how to identify undervalued stocks in the market. Master the art of financial analysis and portfolio management.",
    content: {
      introduction: "Take your value investing knowledge to the next level with advanced techniques and strategies. Learn how to identify undervalued stocks in the market and master the art of financial analysis and portfolio management through comprehensive lessons and practical examples.",
      sections: [
        {
          title: "Advanced Investment Strategies",
          content: "This comprehensive course covers advanced value investing techniques including financial statement analysis, competitive moat evaluation, and risk assessment methodologies. Students will learn to identify quality companies trading at attractive valuations and develop the skills necessary to build a diversified investment portfolio that can weather market storms and generate consistent returns over time."
        },
        {
          title: "Building Investment Criteria",
          content: "Developing a systematic approach to investment selection is crucial for long-term success. This involves creating specific criteria for evaluating potential investments, including minimum return requirements, maximum debt levels, and industry preferences. Successful value investors often use checklists to ensure they maintain discipline and avoid emotional decision-making. The course will teach you how to develop your own investment framework that aligns with your risk tolerance and financial goals."
        },
        {
          title: "Risk Management and Diversification",
          content: "While value investing focuses on buying quality companies at attractive prices, proper risk management is essential for preserving capital. This includes understanding position sizing, diversification across industries and geographies, and knowing when to sell. The course covers strategies for managing downside risk while maintaining the potential for significant upside returns. Students will learn how to construct portfolios that balance growth potential with capital preservation."
        },
        {
          title: "Case Studies and Real-World Applications",
          content: "Learn from historical examples of successful value investments and analyze what made them profitable. The course includes detailed case studies of companies that were once undervalued and eventually recognized by the market. Students will also examine failed investments to understand common pitfalls and how to avoid them. These real-world examples provide practical insights that can be applied to current market opportunities."
        }
      ]
    }
  },
  {
    id: "advanced-portfolio-management",
    title: "Advanced Portfolio Management",
    image: "/assets/education/advanced-portfolio.jpg", 
    description: "Discover advanced strategies for diversifying your investment portfolio and managing risk. Learn from professional fund managers and institutional investors.",
    content: {
      introduction: "Master the art of professional portfolio management with advanced strategies used by institutional investors and hedge funds. Discover sophisticated techniques for diversifying your investment portfolio, managing risk, and optimizing returns across different market conditions.",
      sections: [
        {
          title: "Portfolio Optimization Techniques",
          content: "Advanced portfolio management involves sophisticated techniques for asset allocation, risk management, and performance optimization. This course covers modern portfolio theory, factor-based investing, and alternative investment strategies. Students will learn how to construct efficient portfolios that maximize returns for a given level of risk, implement hedging strategies, and adapt their portfolios to changing market conditions."
        },
        {
          title: "Asset Allocation Strategies",
          content: "Strategic asset allocation is the foundation of successful portfolio management. This section covers how to determine the optimal mix of stocks, bonds, commodities, and alternative investments based on your investment goals, time horizon, and risk tolerance. Students will learn about dynamic asset allocation strategies that adjust to market conditions, as well as tactical allocation techniques used by professional fund managers to enhance returns and reduce volatility."
        },
        {
          title: "Risk Assessment and Management",
          content: "Understanding and managing various types of investment risk is crucial for long-term portfolio success. The course covers systematic risk, unsystematic risk, liquidity risk, and currency risk. Students will learn how to measure portfolio risk using metrics such as Value at Risk (VaR), beta, and standard deviation. Advanced risk management techniques include the use of derivatives for hedging, correlation analysis, and stress testing portfolios under different market scenarios."
        },
        {
          title: "Performance Measurement and Attribution",
          content: "Evaluating portfolio performance goes beyond simple return calculations. This section teaches students how to calculate risk-adjusted returns using metrics like the Sharpe ratio, Treynor ratio, and Jensen's alpha. Performance attribution analysis helps identify which investment decisions contributed most to portfolio returns. Students will also learn about benchmark selection, tracking error analysis, and how to present performance results to stakeholders effectively."
        },
        {
          title: "Alternative Investments and Strategies",
          content: "Modern portfolios often include alternative investments to enhance returns and reduce correlation with traditional assets. This section covers real estate investment trusts (REITs), commodities, private equity, hedge funds, and cryptocurrency investments. Students will learn how to evaluate these alternative investments, understand their risk-return characteristics, and determine appropriate allocation levels within a diversified portfolio."
        }
      ]
    }
  },
  {
    id: "market-analysis-fundamentals",
    title: "Market Analysis Fundamentals",
    image: "/assets/education/market-analysis.jpg",
    description: "Understanding market trends and economic indicators is crucial for successful investing. Learn technical and fundamental analysis techniques from industry experts.",
    content: {
      introduction: "Master the essential skills of market analysis with comprehensive training in both technical and fundamental analysis. Understanding market trends, economic indicators, and company valuations is crucial for successful investing. Learn proven techniques from industry experts and develop the analytical skills needed to make informed investment decisions.",
      sections: [
        {
          title: "Technical and Fundamental Analysis",
          content: "Market analysis combines both technical and fundamental approaches to evaluate investment opportunities. Technical analysis focuses on price patterns, trading volumes, and market sentiment indicators, while fundamental analysis examines economic factors, company financials, and industry trends. This comprehensive approach enables investors to make more informed decisions by understanding both the quantitative and qualitative aspects of market movements."
        },
        {
          title: "Economic Indicators and Market Cycles",
          content: "Understanding macroeconomic indicators is essential for predicting market movements and identifying investment opportunities. This section covers leading, lagging, and coincident indicators such as GDP growth, unemployment rates, inflation data, and central bank policies. Students will learn how these indicators influence different asset classes and how to use economic data to time market entries and exits. The course also explores market cycles, including bull and bear markets, and how to position portfolios accordingly."
        },
        {
          title: "Chart Patterns and Technical Indicators",
          content: "Technical analysis relies on chart patterns and mathematical indicators to predict future price movements. Students will learn to identify common patterns such as head and shoulders, triangles, and flag formations. The course covers popular technical indicators including moving averages, RSI, MACD, and Bollinger Bands. Practical exercises will teach students how to combine multiple indicators to generate trading signals and how to set appropriate stop-loss and take-profit levels."
        },
        {
          title: "Industry and Sector Analysis",
          content: "Different industries and sectors perform differently under various economic conditions. This section teaches students how to analyze industry trends, competitive dynamics, and regulatory environments that affect sector performance. Students will learn to identify which sectors tend to outperform during different phases of the economic cycle and how to use sector rotation strategies to enhance portfolio returns. The course also covers how to evaluate industry-specific metrics and ratios."
        },
        {
          title: "Market Sentiment and Behavioral Finance",
          content: "Market sentiment plays a crucial role in short-term price movements and can create opportunities for contrarian investors. This section explores behavioral finance concepts such as herding behavior, loss aversion, and confirmation bias. Students will learn how to measure market sentiment using indicators like the VIX, put-call ratios, and insider trading data. Understanding these psychological factors helps investors avoid common behavioral traps and capitalize on market inefficiencies caused by emotional decision-making."
        },
        {
          title: "Global Markets and Currency Analysis",
          content: "In today's interconnected world, understanding global markets and currency movements is essential for comprehensive market analysis. This section covers how international events, trade policies, and currency fluctuations affect domestic markets. Students will learn to analyze foreign exchange rates, understand the impact of global economic policies, and identify opportunities in international markets. The course also addresses the risks and benefits of international diversification and currency hedging strategies."
        }
      ]
    }
  }
];
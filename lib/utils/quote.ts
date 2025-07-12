/**
 * Types for quote-related utilities
 */

export interface QuoteData {
  role: string;
  profile: string;
  quotes: string[];
}

export interface QuotesCollection {
  [name: string]: QuoteData;
}

export interface Quote {
  role?: string;
  profile?: string;
  quote: string;
}

/**
 * Extracts and flattens quotes from a nested quotes collection
 * @param quotes - The quotes collection to process
 * @returns An array of flattened quote objects
 */
export function extractQuotesByPerson(quotes: QuotesCollection): Quote[] {
  const quotesResult: Quote[] = [];
  
  for (const userQuotes in quotes) {
    if (Object.prototype.hasOwnProperty.call(quotes, userQuotes)) {
      const quoteData = quotes[userQuotes];
      const quoteList = quoteData.quotes.map(quote => ({
        role: quoteData.role,
        profile: quoteData.profile,
        quote: quote,
      }));

      quotesResult.push(...quoteList);
    }
  }
  
  return quotesResult;
}

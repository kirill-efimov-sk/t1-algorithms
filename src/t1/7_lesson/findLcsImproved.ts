type TLcs = Set<string>;

// LongestCommonSubsequence
export const findLcs = (str1: string, str2: string): string[] => {
    const dp = buildDpTable(str1, str2);
    const maxLen = dp[str1.length][str2.length];
    
    const lcs = getLcs(str1, str2, dp);
    const result = filterLcs(lcs, maxLen);
    
    return result;
};

// create DP-table (matrix)
const buildDpTable = (str1: string, str2: string): number[][] => {
    const m = str1.length, n = str2.length;
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0)); 
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            dp[i][j] = str1[i-1] === str2[j-1] 
                ? dp[i-1][j-1] + 1
                : Math.max(dp[i-1][j], dp[i][j-1]);
        }
    }
    return dp;
};

// get lcs by recursive round
const getLcs = (
    str1: string, 
    str2: string, 
    dp: number[][]): TLcs => {
    const memo = new Map<string, TLcs>();

    const recurseRound = (i: number, j: number): Set<string> => {
        const key = `${i},${j}`;
        if (memo.has(key)) return memo.get(key)!;

            const result = new Set<string>();
    
        if (i === 0 || j === 0) {
            result.add("");
            return result;
        }
        
        if (str1[i - 1] === str2[j - 1]) {
            const subLcs = recurseRound(i - 1, j - 1);
            for (const sub of subLcs) {
                result.add(sub + str1[i - 1]);
            }
        } else {
            if (dp[i - 1][j] === dp[i][j]) {
                const topLcs = recurseRound(i - 1, j);
                for (const sub of topLcs) {
                    result.add(sub);
                }
            }
            if (dp[i][j - 1] === dp[i][j]) {
                const leftLcs = recurseRound(i, j - 1);
                for (const sub of leftLcs) {
                    result.add(sub);
                }
            }
        }
        
        memo.set(key, result);
        return result;
    }
    const result = recurseRound(str1.length, str2.length);

    return result;
};

// filtering lcs result
const filterLcs = (lcs: TLcs, maxLength: number): string[] => {
    return Array.from(lcs).filter(s => s.length === maxLength).sort();
};

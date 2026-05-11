const vocabSets = {

  A: [
    { en: "ubiquitous", zh: "adj. 無所不在的" },
    { en: "alleviate", zh: "v. 緩解、減輕" },
    { en: "deteriorate", zh: "v. 惡化" },
    { en: "meticulous", zh: "adj. 一絲不苟的" },
    { en: "arbitrary", zh: "adj. 任意的、武斷的" },
    { en: "consolidate", zh: "v. 鞏固、合併" },
    { en: "stringent", zh: "adj. 嚴格的、嚴厲的" },
    { en: "impede", zh: "v. 阻礙" },
    { en: "lucrative", zh: "adj. 有利可圖的" },
    { en: "negligible", zh: "adj. 微不足道的" },
    { en: "obsolete", zh: "adj. 過時的" },
    { en: "proliferate", zh: "v. 激增" },
    { en: "scrutinize", zh: "v. 仔細檢查" },
    { en: "substantial", zh: "adj. 大量的、重大的" },
    { en: "tentative", zh: "adj. 暫定的" },
    { en: "unanimous", zh: "adj. 全體一致的" },
    { en: "withstand", zh: "v. 承受、抵抗" },
    { en: "allocate", zh: "v. 分配" },
    { en: "compliance", zh: "n. 遵守" },
    { en: "discrepancy", zh: "n. 差異、不一致" }
  ],

  B: [
    { en: "aberration", zh: "n. 異常" },
    { en: "cognition", zh: "n. 認知" },
    { en: "dichotomy", zh: "n. 二分法" },
    { en: "ephemeral", zh: "adj. 短暫的" },
    { en: "fallacy", zh: "n. 謬論" },
    { en: "hierarchy", zh: "n. 階層制度" },
    { en: "impartial", zh: "adj. 公正的" },
    { en: "juxtapose", zh: "v. 並列比較" },
    { en: "latent", zh: "adj. 潛在的" },
    { en: "paradox", zh: "n. 矛盾" },
    { en: "pragmatic", zh: "adj. 務實的" },
    { en: "rationale", zh: "n. 理由" },
    { en: "skeptical", zh: "adj. 懷疑的" },
    { en: "subjective", zh: "adj. 主觀的" },
    { en: "theoretical", zh: "adj. 理論上的" },
    { en: "validate", zh: "v. 證實" },
    { en: "ambiguous", zh: "adj. 模糊不清的" },
    { en: "coherent", zh: "adj. 連貫的" },
    { en: "derive", zh: "v. 推導、獲得" },
    { en: "empirical", zh: "adj. 經驗的、實證的" }
  ]

};

function getUserVocab(){

  let db=getDB();
  if(!state.user || !db[state.user]) return vocabSets.A;

  return vocabSets[db[state.user].vocabSet || "A"];
  }

  
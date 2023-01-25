export default[
    {
      "algorithmId": 19, 
      "materialFilters": [
        [
          "None", 
          "(M_BlockFlg == Y) or (M_FieldName == PES) or (M_MatQuality != P) or (M_QUALITYCODE2 == 40) or (M_QUALITYCODE2 == 90) or (M_QUALITYCODE3 == 50) or (M_HallName == DROGA) or (M_Grade == AC11) or (M_HeatNo in P*) or (M_HeatNo in U*) or (M_HeatNo in A*) or (M_HeatNo in T*) or (M_HeatNo in H*) or (M_POId not in )"
        ]
      ], 
      "materialQuery": "((M_BlockFlg == 'Y') or (M_FieldName == 'PES') or (M_MatQuality != 'P') or (M_QUALITYCODE2 == 40) or (M_QUALITYCODE2 == 90) or (M_QUALITYCODE3 == 50) or (M_HallName == 'DROGA') or (M_Grade == 'AC11') or (M_HeatNo.str.match(\"\\\\bP.*\\\\b\", na=False)) or (M_HeatNo.str.match(\"\\\\bU.*\\\\b\", na=False)) or (M_HeatNo.str.match(\"\\\\bA.*\\\\b\", na=False)) or (M_HeatNo.str.match(\"\\\\bT.*\\\\b\", na=False)) or (M_HeatNo.str.match(\"\\\\bH.*\\\\b\", na=False)) or (M_POId == M_POId) )", 
      "orderFilters": [
        [
          "None", 
          "(PO_ProductFamily == HDCL_KR_COMBI) and (PO_ProductFamily == HDCL_SW)"
        ], 
        [
          "and", 
          "(PO_OrderReason in 992) or (PS_GradeIn in AC11) or (PO_FinalProductId in HRCL_BP HRST_BP CRST_AS HRCL_BL) or (PO_PODirRoll in BM BZ CM ) or (PO_CoId in 00500*) or (PO_Customer grade in *HC) or (PO_CoId in 0055*) or (PO_SAPState == Y) or (PS_POId in TR*) or (PO_FlagInChangeReq == Y) or (PO_Quality != P)"
        ], 
        [
          "and", 
          "(PO_CoId in 005*)"
        ]
      ], 
      "orderQuery": "((PO_ProductFamily == 'HDCL_KR_COMBI') and (PO_ProductFamily == 'HDCL_SW') and (PO_OrderReason == ['992']) or (PS_GradeIn == ['AC11']) or (PO_FinalProductId == ['HRCL_BP', 'HRST_BP', 'CRST_AS', 'HRCL_BL']) or (PO_PODirRoll == ['BM', 'BZ', 'CM', '']) or (PO_CoId.str.match(\"\\\\b00500.*\\\\b\", na=False)) or (PO_Customer grade.str.match(\"\\\\b.*HC\\\\b\", na=False)) or (PO_CoId.str.match(\"\\\\b0055.*\\\\b\", na=False)) or (PO_SAPState == 'Y') or (PS_POId.str.match(\"\\\\bTR.*\\\\b\", na=False)) or (PO_FlagInChangeReq == 'Y') or (PO_Quality != 'P') and (PO_CoId.str.match(\"\\\\b005.*\\\\b\", na=False)) )"
    }, 
    {
      "algorithmId": 18, 
      "materialFilters": [
        [
          "None", 
          "(index == index)"
        ]
      ], 
      "materialQuery": "((index == index) )", 
      "orderFilters": [
        [
          "None", 
          "(PO_CoId in 005*)"
        ]
      ], 
      "orderQuery": "((PO_CoId.str.match(\"\\\\b005.*\\\\b\", na=False)) )"
    }, 
    {
      "algorithmId": 17, 
      "materialFilters": [
        [
          "None", 
          "(M_Weight < 28)"
        ]
      ], 
      "materialQuery": "((M_Weight < 28) )", 
      "orderFilters": [
        [
          "None", 
          "(PO_CoId in 001*)"
        ]
      ], 
      "orderQuery": "((PO_CoId.str.match(\"\\\\b001.*\\\\b\", na=False)) )"
    }, 
    {
      "algorithmId": 16, 
      "materialFilters": [
        [
          "None", 
          "(M_BlockFlg == Y) or (M_FieldName == PES) or (M_MatQuality != P) or (M_QUALITYCODE2 == 40) or (M_QUALITYCODE2 == 90) or (M_QUALITYCODE3 == 50) or (M_HallName == DROGA) or (M_Grade == AC11) or (M_HeatNo in P*) or (M_HeatNo in U*) or (M_HeatNo in A*) or (M_HeatNo in T*) or (M_HeatNo in H*) or (M_POId not in )"
        ], 
        [
          "or", 
          "(M_FieldName in *4025) or (M_FieldName == DC64030) or (M_FieldName == DC74030) or (M_HallName == DHW) or (M_ERPLocation == 3105) or (M_ERPLocation == 3109)"
        ]
      ], 
      "materialQuery": "((M_BlockFlg == 'Y') or (M_FieldName == 'PES') or (M_MatQuality != 'P') or (M_QUALITYCODE2 == 40) or (M_QUALITYCODE2 == 90) or (M_QUALITYCODE3 == 50) or (M_HallName == 'DROGA') or (M_Grade == 'AC11') or (M_HeatNo.str.match(\"\\\\bP.*\\\\b\", na=False)) or (M_HeatNo.str.match(\"\\\\bU.*\\\\b\", na=False)) or (M_HeatNo.str.match(\"\\\\bA.*\\\\b\", na=False)) or (M_HeatNo.str.match(\"\\\\bT.*\\\\b\", na=False)) or (M_HeatNo.str.match(\"\\\\bH.*\\\\b\", na=False)) or (M_POId == M_POId) or (M_FieldName.str.match(\"\\\\b.*4025\\\\b\", na=False)) or (M_FieldName == 'DC64030') or (M_FieldName == 'DC74030') or (M_HallName == 'DHW') or (M_ERPLocation == '3105') or (M_ERPLocation == '3109') )", 
      "orderFilters": [
        [
          "None", 
          "(PO_CustNo == 0001800366) or (PO_CoId == 0010774689000001) or (PO_CustNo == 0001800164) or (PO_CustNo == 0001800695)"
        ], 
        [
          "or", 
          "(PO_OrderReason in 992) or (PS_GradeIn in AC11) or (PO_FinalProductId in HRCL_BP HRST_BP CRST_AS HRCL_BL) or (PO_PODirRoll in BM BZ CM ) or (PO_CoId in 00500*) or (PO_Customer grade in *HC) or (PO_CoId in 0055*) or (PO_SAPState == Y) or (PS_POId in TR*) or (PO_FlagInChangeReq == Y) or (PO_Quality != P)"
        ]
      ], 
      "orderQuery": "((PO_CustNo == '0001800366') or (PO_CoId == '0010774689000001') or (PO_CustNo == '0001800164') or (PO_CustNo == '0001800695') or (PO_OrderReason == ['992']) or (PS_GradeIn == ['AC11']) or (PO_FinalProductId == ['HRCL_BP', 'HRST_BP', 'CRST_AS', 'HRCL_BL']) or (PO_PODirRoll == ['BM', 'BZ', 'CM', '']) or (PO_CoId.str.match(\"\\\\b00500.*\\\\b\", na=False)) or (PO_Customer grade.str.match(\"\\\\b.*HC\\\\b\", na=False)) or (PO_CoId.str.match(\"\\\\b0055.*\\\\b\", na=False)) or (PO_SAPState == 'Y') or (PS_POId.str.match(\"\\\\bTR.*\\\\b\", na=False)) or (PO_FlagInChangeReq == 'Y') or (PO_Quality != 'P') )"
    }, 
    {
      "algorithmId": 15, 
      "materialFilters": [
        [
          "None", 
          "(M_HeatNo not in H* E*)"
        ]
      ], 
      "materialQuery": "((not M_HeatNo.str.match(\"\\\\bH.*\\\\b\", na=False) & not M_HeatNo.str.match(\"\\\\bE.*\\\\b\", na=False)) )", 
      "orderFilters": [
        [
          "None", 
          "(PO_CoId in 001*)"
        ]
      ], 
      "orderQuery": "((PO_CoId.str.match(\"\\\\b001.*\\\\b\", na=False)) )"
    }, 
    {
      "algorithmId": 14, 
      "materialFilters": [
        [
          "None", 
          "(M_Thickness == 225) or (M_HeatNo not in E*)"
        ]
      ], 
      "materialQuery": "((M_Thickness == 225) or (not M_HeatNo.str.match(\"\\\\bE.*\\\\b\", na=False)) )", 
      "orderFilters": [
        [
          "None", 
          "(PO_CoId in 001*)"
        ]
      ], 
      "orderQuery": "((PO_CoId.str.match(\"\\\\b001.*\\\\b\", na=False)) )"
    }, 
    {
      "algorithmId": 13, 
      "materialFilters": [
        [
          "None", 
          "(M_HeatNo in E* 1*)"
        ]
      ], 
      "materialQuery": "((M_HeatNo.str.match(\"\\\\bE.*\\\\b\", na=False) | M_HeatNo.str.match(\"\\\\b1.*\\\\b\", na=False)) )", 
      "orderFilters": [
        [
          "None", 
          "(PO_CoId in 001*)"
        ]
      ], 
      "orderQuery": "((PO_CoId.str.match(\"\\\\b001.*\\\\b\", na=False)) )"
    }, 
    {
      "algorithmId": 12, 
      "materialFilters": [
        [
          "None", 
          "(M_Grade in D* S* )"
        ]
      ], 
      "materialQuery": "((M_Grade.str.match(\"\\\\bD.*\\\\b\", na=False) | M_Grade.str.match(\"\\\\bS.*\\\\b\", na=False)) )", 
      "orderFilters": [
        [
          "None", 
          "(PO_CoId in 001*)"
        ]
      ], 
      "orderQuery": "((PO_CoId.str.match(\"\\\\b001.*\\\\b\", na=False)) )"
    }, 
    {
      "algorithmId": 11, 
      "materialFilters": [
        [
          "None", 
          "(M_Grade in D* S* )"
        ]
      ], 
      "materialQuery": "((M_Grade.str.match(\"\\\\bD.*\\\\b\", na=False) | M_Grade.str.match(\"\\\\bS.*\\\\b\", na=False)) )", 
      "orderFilters": [
        [
          "None", 
          "(PS_GradeIn in SA4P DF41 DD31 SA31 DF11 SN21 SC7S SA4T SN41 SN31 SN51 CU31 DD81 SA41 LM81 CU11 HN21 SB11 KM21 HN31 SD11 SC41 SB1S SA4S HN61 HN3P AC11 DD90 HN81 HN51 HT31 SE2N IF53 SA11 HN41 HN71 LM71 SA21 SJ21 SK11 HT1M SN11 SC4S SB31 HT11 DD2S DD20 CI11 WJ11 HT21 AM11 SC8S AM21 SB51 SC81 HN2W)"
        ]
      ], 
      "orderQuery": "((PS_GradeIn == ['SA4P', 'DF41', 'DD31', 'SA31', 'DF11', 'SN21', 'SC7S', 'SA4T', 'SN41', 'SN31', 'SN51', 'CU31', 'DD81', 'SA41', 'LM81', 'CU11', 'HN21', 'SB11', 'KM21', 'HN31', 'SD11', 'SC41', 'SB1S', 'SA4S', 'HN61', 'HN3P', 'AC11', 'DD90', 'HN81', 'HN51', 'HT31', 'SE2N', 'IF53', 'SA11', 'HN41', 'HN71', 'LM71', 'SA21', 'SJ21', 'SK11', 'HT1M', 'SN11', 'SC4S', 'SB31', 'HT11', 'DD2S', 'DD20', 'CI11', 'WJ11', 'HT21', 'AM11', 'SC8S', 'AM21', 'SB51', 'SC81', 'HN2W']) )"
    }, 
    {
      "algorithmId": 10, 
      "materialFilters": [
        [
          "None", 
          "(index == index)"
        ]
      ], 
      "materialQuery": "((index == index) )", 
      "orderFilters": [
        [
          "None", 
          "(PO_OrderReason in 992 034) or (PO_ZabrDoAlokacji == Y)"
        ]
      ], 
      "orderQuery": "((PO_OrderReason == ['992', '034']) or (PO_ZabrDoAlokacji == 'Y') )"
    }, 
    {
      "algorithmId": 9, 
      "materialFilters": [
        [
          "None", 
          "(index == index)"
        ]
      ], 
      "materialQuery": "((index == index) )", 
      "orderFilters": [
        [
          "None", 
          "(PO_CoId in 001*)"
        ], 
        [
          "or", 
          "(PO_CoId in 005*)"
        ]
      ], 
      "orderQuery": "((PO_CoId.str.match(\"\\\\b001.*\\\\b\", na=False)) or (PO_CoId.str.match(\"\\\\b005.*\\\\b\", na=False)) )"
    }, 
    {
      "algorithmId": 8, 
      "materialFilters": [
        [
          "None", 
          "(index == index)"
        ]
      ], 
      "materialQuery": "((index == index) )", 
      "orderFilters": [
        [
          "None", 
          "(PO_CoId in 001*)"
        ]
      ], 
      "orderQuery": "((PO_CoId.str.match(\"\\\\b001.*\\\\b\", na=False)) )"
    }, 
    {
      "algorithmId": 7, 
      "materialFilters": [
        [
          "None", 
          "(M_Grade == DF41) or (M_Grade == AC11)"
        ]
      ], 
      "materialQuery": "((M_Grade == 'DF41') or (M_Grade == 'AC11') )", 
      "orderFilters": [
        [
          "None", 
          "(PS_FlgCombine == N)"
        ]
      ], 
      "orderQuery": "((PS_FlgCombine == 'N') )"
    }, 
    {
      "algorithmId": 5, 
      "materialFilters": [
        [
          "None", 
          " and (M_Grade == DF41)"
        ]
      ], 
      "materialQuery": "((M_Grade == 'DF41') )", 
      "orderFilters": [
        [
          "None", 
          "(PO_CoId in 005*)"
        ]
      ], 
      "orderQuery": "((PO_CoId.str.match(\"\\\\b005.*\\\\b\", na=False)) )"
    }, 
    {
      "algorithmId": 4, 
      "materialFilters": [
        [
          "None", 
          "(M_BlockFlg == Y) or (M_FieldName == PES) or (M_MatQuality != P) or (M_QUALITYCODE2 == 40) or (M_QUALITYCODE2 == 90) or (M_QUALITYCODE3 == 50) or (M_HallName == DROGA) or (M_Grade == AC11) or (M_HeatNo in P*) or (M_HeatNo in U*) or (M_HeatNo in A*) or (M_HeatNo in T*) or (M_HeatNo in H*) or (M_POId not in )"
        ], 
        [
          "or", 
          "(M_QUALITYCODE2 == 40) or (M_QUALITYCODE2 == 90) or (M_QUALITYCODE3 == 50) or (M_HallName == DROGA)"
        ], 
        [
          "or", 
          "(M_FieldName in *4025) or (M_FieldName == DC64030) or (M_FieldName == DC74030) or (M_HallName == DHW) or (M_ERPLocation == 3105) or (M_ERPLocation == 3109)"
        ]
      ], 
      "materialQuery": "((M_BlockFlg == 'Y') or (M_FieldName == 'PES') or (M_MatQuality != 'P') or (M_QUALITYCODE2 == 40) or (M_QUALITYCODE2 == 90) or (M_QUALITYCODE3 == 50) or (M_HallName == 'DROGA') or (M_Grade == 'AC11') or (M_HeatNo.str.match(\"\\\\bP.*\\\\b\", na=False)) or (M_HeatNo.str.match(\"\\\\bU.*\\\\b\", na=False)) or (M_HeatNo.str.match(\"\\\\bA.*\\\\b\", na=False)) or (M_HeatNo.str.match(\"\\\\bT.*\\\\b\", na=False)) or (M_HeatNo.str.match(\"\\\\bH.*\\\\b\", na=False)) or (M_POId == M_POId) or (M_QUALITYCODE2 == 40) or (M_QUALITYCODE2 == 90) or (M_QUALITYCODE3 == 50) or (M_HallName == 'DROGA') or (M_FieldName.str.match(\"\\\\b.*4025\\\\b\", na=False)) or (M_FieldName == 'DC64030') or (M_FieldName == 'DC74030') or (M_HallName == 'DHW') or (M_ERPLocation == '3105') or (M_ERPLocation == '3109') )", 
      "orderFilters": [
        [
          "None", 
          "(PO_OrderReason in 992) or (PS_GradeIn in AC11) or (PO_FinalProductId in HRCL_BP HRST_BP CRST_AS HRCL_BL) or (PO_PODirRoll in BM BZ CM ) or (PO_CoId in 00500*) or (PO_Customer grade in *HC) or (PO_CoId in 0055*) or (PO_SAPState == Y) or (PS_POId in TR*) or (PO_FlagInChangeReq == Y) or (PO_Quality != P)"
        ], 
        [
          "or", 
          "(PO_CoId in 005*)"
        ]
      ], 
      "orderQuery": "((PO_OrderReason == ['992']) or (PS_GradeIn == ['AC11']) or (PO_FinalProductId == ['HRCL_BP', 'HRST_BP', 'CRST_AS', 'HRCL_BL']) or (PO_PODirRoll == ['BM', 'BZ', 'CM', '']) or (PO_CoId.str.match(\"\\\\b00500.*\\\\b\", na=False)) or (PO_Customer grade.str.match(\"\\\\b.*HC\\\\b\", na=False)) or (PO_CoId.str.match(\"\\\\b0055.*\\\\b\", na=False)) or (PO_SAPState == 'Y') or (PS_POId.str.match(\"\\\\bTR.*\\\\b\", na=False)) or (PO_FlagInChangeReq == 'Y') or (PO_Quality != 'P') or (PO_CoId.str.match(\"\\\\b005.*\\\\b\", na=False)) )"
    }, 
    {
      "algorithmId": 3, 
      "materialFilters": [
        [
          "None", 
          "(index == index)"
        ]
      ], 
      "materialQuery": "((index == index) )", 
      "orderFilters": [
        [
          "None", 
          "(PO_CoId in 005*) and (PO_FinalProductId == HGCL)"
        ]
      ], 
      "orderQuery": "((PO_CoId.str.match(\"\\\\b005.*\\\\b\", na=False)) and (PO_FinalProductId == 'HGCL') )"
    }, 
    {
      "algorithmId": 2, 
      "materialFilters": [
        [
          "None", 
          "(M_Grade == DF41)"
        ]
      ], 
      "materialQuery": "((M_Grade == 'DF41') )", 
      "orderFilters": [
        [
          "None", 
          "(PS_WidthEdgeMin >= 1400)"
        ]
      ], 
      "orderQuery": "((PS_WidthEdgeMin >= 1400) )"
    }, 
    {
      "algorithmId": 1, 
      "materialFilters": [
        [
          "None", 
          "(index == index)"
        ]
      ], 
      "materialQuery": "((index == index) )", 
      "orderFilters": [], 
      "orderQuery": "()"
    }
  ]
  
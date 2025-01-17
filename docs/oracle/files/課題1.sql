 SQL検索課題

表示結果整形のため、事前に以下を実行しましょう。
column DEPARTMENT_NAME format a20
column QUALIFICATION_NAME format a20
column DESCRIPTION format a20
column CERTIFICATION_BODY format a20
column EMPLOYEE_NAME format a20
column POSITION format a20
column 従業員名 format a20
column 部署名 format a20
column 資格名 format a20
column 上司の従業員名 format a20
column POSITION format a20
column 評価者名 format a20


 1. 基本的な検索

 1-1. 単一条件での検索

問題1:  
給与が300,000円以上の従業員を検索してください。  
出力項目：従業員ID、従業員名、給与

問題2:  
営業部（department_id = 30）に所属する従業員を検索してください。  
出力項目：従業員ID、従業員名、部署ID

問題3:  
2023年4月1日以降に入社した従業員を検索してください。  
出力項目：従業員ID、従業員名、入社日

 1-2. 複数条件での検索

問題4:  
給与が250,000円以上かつ総務部（department_id = 20）に所属する従業員を検索してください。  
出力項目：従業員ID、従業員名、給与、部署ID

問題5:  
役職が'Section Chief'または'Chief'の従業員を検索してください。  
出力項目：従業員ID、従業員名、役職

問題6:  
2022年度（2022年4月1日から2023年3月31日まで）に入社した従業員を検索してください。  
出力項目：従業員ID、従業員名、入社日

 1-3. パターンマッチと並び替え

問題7:  
従業員名に「田」が含まれる従業員を検索してください。  
出力項目：従業員ID、従業員名

問題8:  
給与が300,000円から400,000円の範囲の従業員を検索し、給与の高い順に表示してください。  
出力項目：従業員ID、従業員名、給与

問題9:  
入社日の古い順に従業員を検索してください。ただし、同じ入社日の場合は給与の高い順とします。  
出力項目：従業員ID、従業員名、入社日、給与

問題10:  
部署ID、役職の順に並び替えて従業員を検索してください。  
出力項目：従業員ID、従業員名、部署ID、役職


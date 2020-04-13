# Gatsby Search with Algolia

 ตัวอย่างการทำ Search ด้วย Gatsby - Algolia อ้างอิงจากบทความ https://www.gatsbyjs.org/docs/adding-search-with-algolia/

 
บทความที่เขียน https://devahoy.com/blog/2020/04/gatsby-search-with-algolia/

## Usage

1. ลง dependencies

```
npm install
```

2. เปลี่ยนค่า API Key ของ Algolia ในไฟล์ `.env` (ก็อปจาก `.env.example` ได้) และรัน build เพื่อส่ง index ไปเก็บที่ Algolia

```bash
npm run build
```

3. จากนั้น Start server ได้เลย ลองเพิ่มเนื้อหา และ submit index ไปใหม่

Have Fun!
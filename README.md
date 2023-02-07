readme

`rm -rf node_modules`  
`npm i`

Run this on http://localhost:3000 rather than http://127.0.0.1:3000, otherwise cookies won't work

## Manual AWS Deployment

`npm run build`  
`aws s3 sync build/ s3://console.depploy.io`  
`aws cloudfront create-invalidation --distribution-id E3RDWRXLNLJ5RY --paths '/*'`

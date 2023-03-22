## Getting Started

`nvm use && npm run dev`

Run this on http://localhost:3000 rather than http://127.0.0.1:3000, otherwise cookies won't work

## Update local packages

`npm outdated`  
`npm update`

## Manual AWS Deployment

`npm run build`  
`aws s3 sync build/ s3://console.depploy.io`  
`aws cloudfront create-invalidation --distribution-id E3RDWRXLNLJ5RY --paths '/*'`

## Troubleshooting

If your hot reload breaks because there are too many files to watch,
try closing any other React apps you have open. If that doesn't work,
try removing and reinstalling your node modules.  
`rm -rf node_modules`  
`npm i`

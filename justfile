set quiet

aws:
  aws-vault exec aedenmurray
  
fmt:
  terraform fmt -recursive

init:
  terraform init

plan:
  terraform plan

apply:
  terraform
  terraform apply

lint:
  npm run eslint src -- --ext .jsx,.js

fix:
  npm run eslint src -- --ext .jsx,.js --fix

build:
  node esbuild.js

serve:
  node esbuild.js --serve

invalidate:
  aws cloudfront create-invalidation \
    --distribution-id E2NWH87KQ3CPU8 \
    --no-cli-pager \
    --paths '/*'
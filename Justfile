set quiet
vite := 'npm run -s vite'
eslint := 'npm run -s eslint'
terraform := 'terraform -chdir=terraform'

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
  {{eslint}} src -- --ext .jsx,.js

fix:
  {{eslint}} src -- --ext .jsx,.js --fix

build:
  node esbuild.js

serve:
  {{vite}}

invalidate:
  aws cloudfront create-invalidation \
    --distribution-id E2NWH87KQ3CPU8 \
    --no-cli-pager \
    --paths '/*'
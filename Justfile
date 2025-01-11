set quiet
eslint := 'npm run -s eslint'
terraform := 'terraform -chdir=.devops/terraform'
vite := 'npm run -s vite -- --config .devops/vite.config.js'

aws:
  aws-vault exec aedenmurray
  
fmt:
  {{terraform}} fmt -recursive

init:
  {{terraform}} init

plan:
  {{terraform}} plan

apply:
  {{terraform}} apply

console:
  {{terraform}} console

lint:
  {{eslint}} src -- --ext .jsx,.js

fix:
  {{eslint}} src -- --ext .jsx,.js --fix

build:
  {{vite}} build

serve:
  {{vite}} serve

bust:
  aws cloudfront create-invalidation \
    --distribution-id E1ANJ1GCT0ZQ83 \
    --no-cli-pager \
    --paths '/*'

deploy:
	just build
	just apply
	just bust

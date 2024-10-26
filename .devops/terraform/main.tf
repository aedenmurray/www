terraform {
  cloud {
    organization = "aedenmurray"

    workspaces {
      name = "www"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

locals {
  domain = "aedenmurray.dev"
}
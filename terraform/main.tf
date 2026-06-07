terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# Reference the existing bucket — Terraform will not create or modify it.
data "aws_s3_bucket" "site" {
  bucket = var.bucket_name
}

# ── GitHub Actions OIDC Provider ─────────────────────────────────────────────
# If this already exists in your account, import it instead of letting Terraform
# create a duplicate:
#   aws iam list-open-id-connect-providers
#   terraform import aws_iam_openid_connect_provider.github <arn>

resource "aws_iam_openid_connect_provider" "github" {
  url            = "https://token.actions.githubusercontent.com"
  client_id_list = ["sts.amazonaws.com"]
  thumbprint_list = ["6938fd4d98bab03faadb97b34396831e3780aea1"]
}

# ── IAM Role ─────────────────────────────────────────────────────────────────

resource "aws_iam_role" "github_actions" {
  name        = "github-actions-myblog-deploy"
  description = "Assumed by GitHub Actions via OIDC to deploy myblog to S3."

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Sid    = "GitHubOIDCTrust"
      Effect = "Allow"
      Principal = {
        Federated = aws_iam_openid_connect_provider.github.arn
      }
      Action = "sts:AssumeRoleWithWebIdentity"
      Condition = {
        StringEquals = {
          "token.actions.githubusercontent.com:aud" = "sts.amazonaws.com"
        }
        StringLike = {
          "token.actions.githubusercontent.com:sub" = "repo:${var.github_repo}:ref:refs/heads/*"
        }
      }
    }]
  })

  tags = {
    Project   = "myblog"
    ManagedBy = "terraform"
  }
}

resource "aws_iam_role_policy" "github_actions_s3" {
  name = "myblog-s3-deploy"
  role = aws_iam_role.github_actions.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid      = "AllowSync"
        Effect   = "Allow"
        Action   = ["s3:PutObject", "s3:DeleteObject", "s3:GetObject"]
        Resource = "${data.aws_s3_bucket.site.arn}/*"
      },
      {
        Sid      = "AllowList"
        Effect   = "Allow"
        Action   = "s3:ListBucket"
        Resource = data.aws_s3_bucket.site.arn
      }
    ]
  })
}

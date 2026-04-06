variable "bucket_name" {
  description = "Name of the existing S3 bucket for the static website."
  type        = string
}

variable "aws_region" {
  description = "AWS region the bucket lives in."
  type        = string
  default     = "us-east-1"
}

variable "github_repo" {
  description = "GitHub repository in owner/repo format, used to scope the OIDC trust."
  type        = string
  default     = "anshumankmr/myblog"
}

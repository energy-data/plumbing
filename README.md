# Plumbing

This repository contains infrastructure code for handling backups and tagging them.

## Lambda functions

Lambda functions are deployed using [apex](http://apex.run)

Before running `apex` you should export the following variables to your environment:
 - `AWS_REGION`
 - `AWS_SECRET_ACCESS_KEY`
 - `AWS_ACCESS_KEY_ID`

### create-tags
`apex deploy -s VOLUME_SOURCE=MY_VOLUME create-tags`
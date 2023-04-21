terraform {
  backend "azurerm" {}

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "3.53"
    }
    random = {
      source = "hashicorp/random"
    }
  }
}

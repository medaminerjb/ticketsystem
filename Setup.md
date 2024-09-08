# TODOAPP VUE-DJANGO

## Overview

**TODOAPP VUE-DJANGO** is a Dockerized application that provides a full-featured TODO list management system. This application allows users to perform CRUD (Create, Read, Update, Delete) operations on TODO items, includes authentication for user management, and supports multiple languages.
## Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- [Docker](https://docs.docker.com/get-docker/)
- (Optional) [Docker Compose](https://docs.docker.com/compose/install/) if your setup requires it.

### Pull the Docker Image

To download the Docker image, execute:

```bash
docker pull medaminerjb/ticketsystem-django-backend:latest

```
### Run the Docker Container 

To start a container from the image, use:

```
docker run -d -p 8000:8000 --name medaminerjb/ticketsystem-django-backend:latest

```
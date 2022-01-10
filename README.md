## Tiny Microservices

🐳 Mini app for learning Microservices & Kubernetes Concept

## Services & Features

![](https://i.postimg.cc/HsqLbpRn/Screen-Shot-2022-01-09-at-6-13-03-PM.png)

![](https://i.postimg.cc/nLZcw3Ht/Screen-Shot-2022-01-09-at-6-13-38-PM.png)

## Tech Stack

- [Nodejs](https://nodejs.org/en/) & [Express](https://www.npmjs.com/package/express)
- [React](https://reactjs.org/)
- [Docker](https://www.docker.com/products/docker-desktop)
- [Kubernetes](https://kubernetes.io/)
- [Nginx Ingress Controller](https://kubernetes.github.io/ingress-nginx/deploy/)
- [Skaffold](https://skaffold.dev/) (optional)

## Setting Host File

Because i setup kubernetes host to posts.com, we need add posts.com into host config, like this:
![](https://i.postimg.cc/MpJQqbW9/Screen-Shot-2022-01-09-at-6-39-53-PM.png)

The Path of the hostfile config:
![](https://i.postimg.cc/WztMq2KS/Screen-Shot-2022-01-09-at-6-37-48-PM.png)

## How To Run

With Skaffold:

- `skaffold dev`
- open browser, type: posts.com

Without Skaffold :

- enter infra/k8s folder
- type: `kubectl apply -f .`
- open browser, type: posts.com

© January 2022

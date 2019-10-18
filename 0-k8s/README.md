# KUSTOMIZE

```bash
mkdir deploy/

kubectl create deployment nginx --dry-run -o yaml --image nginx > deploy/nginx-deploy.yml
c -r deploy/nginx-deploy.yml

```

## Resources
- https://github.com/kubernetes-sigs/kustomize/blob/master/examples/helloWorld/README.md

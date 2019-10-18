# HPA

```bash
# deploy the web server
kubectl create deployment busyhttp --image=jpetazzo/busyhttp

# expose it with a service
kubectl expose deployment busyhttp --port=80 --type=LoadBalancer

# show the service and get public ip
IP=$(kubectl get service busyhttp -o jsonpath='{.status.loadBalancer.ingress[0].ip}')
echo $IP

# single request
curl $IP

# many requests
hey "http://${IP}" -c 10 -n 500

# monitor pod cpu usage
kubectl top pods

# monitor cluster events
kubectl get events -w

# create an hpa policy
kubectl autoscale deployment busyhttp --max=10

# edit the deployment
kubectl edit deployment busyhttp

# add to resources:
resources: {"requests":{"cpu":"1", "memory":"100M"}}



```

## tmux

```bash
# open tmux
tmux
# create a new window
ctrl+b, c
# go to next window
ctrl+b, n
```

## download and install hey

From <https://github.com/rakyll/hey/releases>:
- Windows 64-bit: https://storage.googleapis.com/jblabs/dist/hey_win_v0.1.2.exe
- Linux 64-bit: https://storage.googleapis.com/jblabs/dist/hey_linux_v0.1.2
- macOS 64-bit: https://storage.googleapis.com/jblabs/dist/hey_darwin_v0.1.2

## Resources
- https://oscon2019.container.training/#171

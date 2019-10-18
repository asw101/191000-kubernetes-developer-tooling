# BRIGADE

## install brigade
```
// install brigade using helm
helm repo add brigade https://brigadecore.github.io/charts
helm install brigade/brigade --name brigade-server

// check brigade status
helm get brigade-server
```

## install brigade (helm3 + generic gateway)
```bash
helm3 repo add brigade https://brigadecore.github.io/charts
helm3 install brigade-server brigade/brigade --set genericGateway.enabled=true
helm3 get brigade-server
```

## install brig
```bash
# via: https://github.com/brigadecore/brigade/releases
sudo curl -L https://github.com/brigadecore/brigade/releases/download/v1.2.1/brig-darwin-amd64 -o /usr/local/bin/brig
sudo chmod +x /usr/local/bin/brig
```

## get examples
```bash
git clone git@github.com:brigadecore/brigade.git
cp -r brigade/docs/content/examples examples/
rm -rf brigade/
```

## run hello-world example
```bash
# create a new empty project
brig project create --no-prompts
PROJECT_ID='brigade-4897c99315be5d2a2403ea33bdcb24f8116dc69613d5917d879d5f'

# example: hello world
brig run --file examples/brigade-01.js $PROJECT_ID

# example: exec
brig run --file examples/brigade-02.js $PROJECT_ID

# example: do nothing 
brig run --file examples/brigade-05.js $PROJECT_ID

# example: hello world
brig run --file examples/brigade-06.js $PROJECT_ID
brig run --file examples/brigade-07.js $PROJECT_ID
brig run --file examples/brigade-08.js $PROJECT_ID

# example: nodejs build
brig run --file examples/brigade-09.js $PROJECT_ID

# example: Group.runAll
brig run --file examples/brigade-10.js $PROJECT_ID

# example: storage.enabled
brig run --file examples/brigade-15.js $PROJECT_ID

# example: multiple jobs, with names
brig run --file examples/advanced-04.js $PROJECT_ID
```

## brig commands
```bash
brig build list

brig build delete 01dq33d3bgc80tr7y7qwq7kx4t --force

brig build delete-all $PROJECT_ID --force

# clean-up completed pods?
kubectl delete pod --field-selector=status.phase==Succeeded
```

## connect to kashti
```bash
brig dashboard

# or ...
kubectl port-forward deploy/brigade-server-kashti 8000:80
# open localhost:8000
```

## generic gateway
```bash
kubectl port-forward service/brigade-server-brigade-generic-gateway 8000:8081 &
# Use `fg` to restore

# brig project list
PROJECT_ID='myproject'
SECRET=$(brig project get ${PROJECT_ID} | jq -r .stringData.genericGatewaySecret)

URL="http://localhost:8000/simpleevents/v1/${PROJECT_ID}/${SECRET}"
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{
    "ref": "refs/heads/changes",
    "commit": "b60ad9543b2ddbbe73430dd6898b75883306cecc",
    "key1": "value1",
    "key2": "value2"
}' $URL
  
echo $URL
```

## build brig
```bash
mkdir -p $GOPATH/src/github.com/brigadecore/
cd $GOPATH/src/github.com/brigadecore/
git clone git@github.com:brigadecore/brigade.git
cd brigade
make bootstrap brig
```

## Resources
- https://docs.brigade.sh/intro/overview/
- Building Kubernetes event driven pipelines with Brigade: <https://www.youtube.com/watch?v=Y9OeZ0qXC3o>

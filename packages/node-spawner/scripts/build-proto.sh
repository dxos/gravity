mkdir -p ./src/proto/gen
pbjs -t json ./src/proto/node.proto -o ./src/proto/gen/node.json
pbjs -t static-module -w commonjs ./src/proto/node.proto -o ./src/proto/gen/node.js
pbts ./src/proto/gen/node.js -o ./src/proto/gen/node.d.ts
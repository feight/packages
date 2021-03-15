
lint:
	eslint babel-preset/src --fix; \
	eslint cli-notify/src --fix; \
	eslint cli-tasks/src --fix; \
	eslint cli-utils/src --fix; \
	eslint eslint-config/src --fix; \
	eslint imagemin/src --fix; \
	eslint legacy-cli/src --fix; \
	eslint legacy-cli-config/src --fix; \
	eslint legacy-cli-errors/src --fix; \
	eslint legacy-cli-logger/src --fix; \
	eslint legacy-service-worker/src --fix; \
	eslint legacy-settings/src --fix; \
	eslint legacy-webpack-config/src --fix; \
	eslint npm-install-local/src --fix; \
	eslint package-json/src --fix; \
	eslint postcss-config/src --fix; \
	eslint schema/src --fix; \
	eslint stylelint-config/src --fix
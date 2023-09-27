export default {
	async fetch(request, env, ctx) {
		if (new URL(request.url).pathname === '/install-go')
			return new Response(
				'#!/bin/sh\ncd\ncurl -OL https://golang.org/dl/go1.21.1.linux-amd64.tar.gz\nsudo tar -C /usr/local -xvf go1.21.1.linux-amd64.tar.gz\nrm go1.21.1.linux-amd64.tar.gz\necho "export PATH=$PATH:/usr/local/go/bin" >> ~/.profile\nsource ~/.profile\ngo version'
			)
		if (new URL(request.url).pathname === '/enable-bbr')
			return new Response(
				'#!/bin/bash\nsudo echo "net.core.default_qdisc=fq\nnet.ipv4.tcp_congestion_control=bbr" >> /etc/sysctl.conf\nsysctl -p'
			)
		return new Response(
			'echo "help:\n\nwget -O - https://ezsh.alirezasn.workers.dev/install-go -q >> install-go.sh && source install-go.sh && rm install-go.sh\n\nwget -O - https://ezsh.alirezasn.workers.dev/enable-bbr -q | bash"'
		)
	}
}

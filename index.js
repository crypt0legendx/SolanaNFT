var web3 = require('@solana/web3.js');
var splToken = require('@solana/spl-token');

(async() => {
    //connect to cluster
    var connection = new web3.Connection(
        web3.clusterApiUrl("devnet"),
        'confirmed',
    );
})
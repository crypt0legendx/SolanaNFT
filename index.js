var web3 = require('@solana/web3.js');
var splToken = require('@solana/spl-token');

(async() => {
    //connect to cluster
    var connection = new web3.Connection(
        web3.clusterApiUrl("devnet"),
        'confirmed',
    );

    // Generate a new wallet keypair and airdrop SOL
    var fromWallet = web3.Keypair.generate();
    var fromAirdropSignature = await connection.requestAirdrop(
        fromWallet.publicKey,
        web3.LAMPORTS_PER_SOL,
    );
    //wait for airdrop confirmation
    await connection.confirmTransaction(fromAirdropSignature);

    //create new token mint
    let mint = await splToken.Token.createMint(
        connection,
        fromWallet,
        fromWallet.publicKey,
        null,
        9,
        splToken.TOKEN_PROGRAM_ID,
    );

    // get the token account of the fromwallet Solana address, if it does not exist, create it.
    let fromTokenAccount = await mint.getOrCreateAssociatedAccountInfo(fromWallet.publicKey, );

    var toWallet = web3.Keypair.generate();

    //get the token account of the toWallet Solana address, if it is does not exist, create it.
    var toTokenAccount = await mint.getOrCreateAssociatedAccountInfo(
        toWallet.publicKey,
    );


})
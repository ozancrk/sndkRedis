const WPAPI = require( 'wpapi' );

const wp = new WPAPI({
    endpoint: process.env.WPENDPOINT+'/wp-json',
});

module.exports = wp;
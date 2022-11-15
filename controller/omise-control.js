var omise = require('omise')({
    'publicKey': process.env.OMISE_PUBLIC_KEY,
    'secretKey': process.env.OMISE_SECRET_KEY,
});

const checkoutCreditCard = async (req, res, next) => {
    console.log(req);
    const { email, name, amount, token } = req.body
    try {
        const customer = await omise.customers.create({
            email,
            description: name,
            card: token
        });

        const charge = await omise.charges.create({
            amount: amount,
            currency: "thb",
            customer: customer.id
        });

        res.send({
            amount: charge.amount,
            status: charge.status
        })

    } catch (err) {
        console.log(err);
    }
    next()
};

module.exports = {
    checkoutCreditCard
}
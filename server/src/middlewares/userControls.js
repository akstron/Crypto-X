/**
 * Middlewares for functions available to user
 */

/* Function for checking edit access */ 
const checkEditPossible = (changes) => {
    return (
    !('isVerified' in changes || 
    'isEligible' in changes || 
    'wallet' in changes || 
    'email' in changes || 
    '_id' in changes || 
    'googleId' in changes));
}

module.exports.AddPancard = async(req, res) => {
    const { pancard } = req.body;
    const { user } = req;
    
    try{
        if(!pancard){
            return res.status(400).json({
                status: false,
                error: 'Provide pancard'
            });
        } 

        user.isEligible = true;
        user.pancard = pancard;
        await user.save();
    
        return res.json({
            status: true,
            message: 'Pancard added successfully!'
        });
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            status: false,
            error: 'Internal server error'
        });
    }
}

module.exports.EditUser = async (req, res) => {
    
    try{
        const changes = req.body;
        const user = req.user;

        if(!checkEditPossible(changes)){
            return res.status(405).json({
                status: false,
                error: 'Changes not allowed'
            });
        }

        for(const [key, value] of Object.entries(changes)){
            user[key] = value;
        }

        await user.save();
    
        return res.json({
            status: true, 
            user
        });

    } catch(e){
        console.log(e);
        
        return res.status(500).json({
            status: false,
            error: 'Internal server error'
        });
    }
};

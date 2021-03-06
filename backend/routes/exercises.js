const router = require('express').Router();
let Exercise = require('../models/exercise.model');

router.route('/').get((req, res) => {
    Exercise.find()
       .then(exercises => res.json(exercises))
       .catch(err =>  res.status(400).json('Error: '+ err));
});


router.route('/add').post((req, res) => {
   const username = req.body.username;
   const description = req.body.description;
   const duration = Number(req.body.duration);
   const date = Date(req.body.date);
   console.log("start")
   const newExercise = new Exercise({
       username,
       description,
       duration,
       date,
    });

    newExercise.save()
       .then(() => res.json('User added!'))
       .catch(err => res.status(400).json('Error: ' + err));

});

router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exercise deleted.'))
        .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/update:id').post((req, res) => {
    /*const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date(req.body.date);
    console.log("start")
    const exercise = new Exercise({
        username,
        description,
        duration,
        date,
     });*/
 
    Exercise.findByIdAndUpdate(req.params.id)
        .then(
          exercise => {
            exercise.username = req.body.username;
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date);

            exercise.save()
                .then(() => res.json('Excerise Updated!'))
                .catch(err => res.status(400).json('Error: '+ err));
        })


        .catch(err => res.status(400).json('Error: '+ err));
        

        // var user_id = req.params.id;
        // var username = req.body.username;
        // var description = req.body.description;
    
        // res.send(user_id + ' ' + username + ' ' + description);

 
        
});



module.exports = router;
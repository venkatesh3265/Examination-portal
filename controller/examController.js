const createExam =  async (req,res) => {

    res.status(201).json({ message: 'Exam created successfully' });

}

export {createExam}
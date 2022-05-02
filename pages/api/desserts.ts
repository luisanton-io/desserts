// NextJS API: https://github.com/
import { NextApiRequest, NextApiResponse } from 'next';
import getDesserts from '../../utils/getDesserts';

export default function Handler(req: NextApiRequest, res: NextApiResponse) {
    getDesserts().then(desserts => {
        res.status(200).json(desserts);
    }).catch(err => {
        res.status(500).json({ message: err.message });
    });
}
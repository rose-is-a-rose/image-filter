import { Router, Request, Response } from 'express';
import { filterImageFromURL, doesFileExist } from '../util/util';
import { requireAuth } from './auth';
import { config } from '../config';
import * as jwt from 'jsonwebtoken';

const router: Router = Router();

// Root Endpoint
// Displays a simple message to the user
router.get("/", async (req: Request, res: Response) => {
    res.send("try GET /filteredimage?image_url={{}}")
});

/**
 * GET /filteredimage?image_url={{URL}}
 */
router.get('/filteredimage', requireAuth, async (req: Request, res: Response) => {
    let { image_url } = req.query;
    // check image url is valid
    if (!image_url) {
        return res.status(400).send({ message: '`image_url` is required' });
    }
    const fileExists: boolean = await doesFileExist(image_url);

    if (!fileExists) {
        return res.status(404).send({ message: 'image_url is invalid' });
    } else {
        const filteredpath: string = await filterImageFromURL(image_url);
        res.status(200).sendFile(filteredpath);
    }
});

export const IndexRouter: Router = router;
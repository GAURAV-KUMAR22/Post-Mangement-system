import { Redis } from 'ioredis';



const redis = new Redis();


const casheData = async (req, res, next) => {
    try {
        const cashed = await redis.get('user:1');
        console.log('log1')
        if (cashed) {
            return res.json(JSON.parse(cashed));
        };
        next()
    } catch (error) {
        res.status(500).json({ message: 'redis cashed deta fetching failed' })
        console.log('log1')
        next();
    }
}

export { redis, casheData }
import { Redis } from 'ioredis';



const redis = new Redis({
    host: 'redis',
    port: 6379
});


const casheData = async (req, res, next) => {
    try {
        const cashed = await redis.get();
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
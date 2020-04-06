const rest = require('../clients/restclient');
const gql = require('../clients/gqlclient');
const { generateComments } = require("./mock");

const defaultArguments = [true];
const iterations = 2;

async function calculateMean(fun, arguments, type, auxiliary, clear) {
    let time = 0;
    const copyArg = arguments;
    for (let i = 0; i < iterations; i++) {
        if (auxiliary) {
            arguments = [await auxiliary(...copyArg)];
        }
        const t = await fun(...[...arguments, ...defaultArguments]);
        console.log(`This ${type} iteration was done in: ${t}`);
        time += t;
        if (clear) {
            await clear(...defaultArguments);
        }
        await new Promise(r => setTimeout(r, 500));
    }
    console.log(`The ${type} ${iterations} finished in ${time / iterations}`);
    return time;
}

async function benchmark(restParams, gqlParams, auxiliaryParams, clearParams) {
    const {restFun, argumentsRest} = restParams;
    const {gqlFun, argumentsGql} = gqlParams;
    const {gqlAuxFun, restAuxFun} = auxiliaryParams || {};
    const {clearRestFun, clearGqlFun} = clearParams || {};

    console.log(`Starting benchmarking for rest`);
    const timeRest = await calculateMean(restFun, argumentsRest, "rest", restAuxFun, clearRestFun);

    await new Promise(r => setTimeout(r, 2000));

    console.log(`Starting benchmarking for Gql`);
    const timeGql = await calculateMean(gqlFun, argumentsGql, "gql", gqlAuxFun, clearGqlFun);

    return {rest: timeRest / iterations, gql: timeGql / iterations}
}

function benchmarkAdd(generateFunction, restFunction, gqlFunction, clearRest, clearGql) {
    const comment = generateFunction(1);
    benchmark({
            restFun: restFunction,
            argumentsRest: [comment]
        },
        {
            gqlFun: gqlFunction,
            argumentsGql: [comment]
        },
        null,
        {
            clearGqlFun: clearRest, // TODO: Be careful with this when big data arises
            clearRestFun: clearGql
        }
    )
        .then(res => {
            console.log(res);
            console.log("Deleting all entered entities, all clear");
        });
}

function benchmarkGetAll(restFun, gqlFun) {
    benchmark({
            restFun: restFun,
            argumentsRest: []
        },
        {
            gqlFun: gqlFun,
            argumentsGql: []
        })
        .then(res => {
            console.log(res);
            console.log("Finished, all good");
        });
}

function benchmarkGetOne() {
    let comment = generateComments(1);

    benchmark({
            restFun: rest.getOneCommentRest,
            argumentsRest: [comment]
        },
        {
            gqlFun: gql.getOneCommentGql,
            argumentsGql: [comment]
        },
        {
            restAuxFun: rest.addCommentRest,
            gqlAuxFun: gql.addCommentGql
        })
        .then(res => {
            console.log(res);
            console.log("Finished, all good");
        });
}

async function benchmarkUpdate() {
    const comment = generateComments(1);
    const idRest = await rest.addCommentRest(comment);
    const idGql = await gql.addCommentGql(comment);
    comment.id = idRest;
    const commentRest = comment;
    comment.id = idGql;

    const result = await benchmark({
            restFun: rest.updateCommentRest,
            argumentsRest: [idRest, commentRest]
        },
        {
            gqlFun: gql.updateCommentGql,
            argumentsGql: [...Object.values(comment)]
        });
    console.log(result);
    // await rest.deleteCommentRest(idRest);
    // await gql.deleteCommentGql(idGql);
    console.log("Cleaned up the comments. All good!");
}

function benchmarkDelete() {
    const comment = generateComments(1);
    benchmark({
            restFun: rest.deleteCommentRest,
            argumentsRest: [comment]
        },
        {
            gqlFun: gql.deleteCommentGql,
            argumentsGql: [comment]
        },
        {
            restAuxFun: rest.addCommentRest,
            gqlAuxFun: gql.addCommentGql
        })
        .then(res => {
            console.log(res);
            console.log("All cleaned up!");
        });
}

function benchmarkBulkAdd(generateFunction, restFunction, gqlFunction, clearRest, clearGql) {
    const comments = generateFunction(100);
    benchmark({
            restFun: restFunction,
            argumentsRest: [comments]
        },
        {
            gqlFun: gqlFunction,
            argumentsGql: [comments]
        },
        // null,
        // {
        //     clearGqlFun: clearGql, // TODO: Be careful with this when big data arises
        //     clearRestFun: clearRest
        // }
    )
        .then(res => {
            console.log(res);
            console.log("All cleaned up!");
        })
}

function benchmarkBulkDelete() {
    const comments = generateComments(5000);
    benchmark({
            restFun: rest.deleteCommentsRest,
            argumentsRest: [comments]
        },
        {
            gqlFun: gql.deleteCommentsGql,
            argumentsGql: [comments]
        },
        {
            restAuxFun: rest.addCommentsRest,
            gqlAuxFun: gql.addCommentsGql
        })
        .then(res => {
            console.log(res);
            console.log("All cleaned up!"); // TODO: Improve logs
        });
}

module.exports = Object.freeze(
    {
        benchmark,
        benchmarkGetAll,
        benchmarkAdd,
        benchmarkBulkAdd
    }
);


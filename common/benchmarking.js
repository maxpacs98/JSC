import { addCommentRest, getOnePostRest } from "../clients/restclient.js";
import { addCommentGql, getOnePostGql } from "../clients/gqlclient.js";

const defaultArguments = [true];
const iterations = 10;

async function* calculateMean(fun, argz, type, auxiliary, clear) {
    /* Calculates the average of the response times over all iterations
     Sets up, tears down after they are executed*/

    // let time = 0;
    const copyArg = argz;
    for (let i = 0; i < iterations; i++) {
        if (auxiliary) {
            argz = [await auxiliary(...copyArg)];
        }
        const t = await fun(...[...argz, ...defaultArguments]);
        yield t;
        // console.log(`This ${type} iteration was done in: ${t}`);
        // time += t;
        if (clear) {
            await clear(...defaultArguments);
        }
        // await new Promise(r => setTimeout(r, 500));
    }
    // console.log(`The ${type} ${iterations} finished in ${time / iterations}`);
    // return time;
}

async function* benchmark(restParams, gqlParams, auxiliaryParams, clearParams) {
    /* Sends asynchronously one REST and one GQL request every iteration and yields their response times */
    const {restFun, argumentsRest} = restParams;
    const {gqlFun, argumentsGql} = gqlParams;
    const {gqlAuxFun, restAuxFun} = auxiliaryParams || {};
    const {clearRestFun, clearGqlFun} = clearParams || {};

    console.log(`Starting benchmarking`);
    let rest = calculateMean(restFun, argumentsRest, "rest", restAuxFun, clearRestFun);
    let gql = calculateMean(gqlFun, argumentsGql, "gql", gqlAuxFun, clearGqlFun);

    let restResult = {done: false};
    let gqlResult = {done: false};
    while (!restResult.done || !gqlResult.done) {
        let promises = [];
        promises.push(
             new Promise(async function (resolve, reject) {
                 // return await ;
                 return resolve(rest.next());
             })
         )
        promises.push(
            new Promise(async function (resolve, reject) {
                // return await gql.next();
                return resolve(gql.next());
            })
         )
        const res = await Promise.all(promises);
        restResult = res[0];
        gqlResult = res[1];
        yield {restResult, gqlResult}
    }

    // await new Promise(r => setTimeout(r, 0));

    // console.log(`Starting benchmarking for Gql`);

    // return {rest: timeRest / iterations, gql: timeGql / iterations}
}

/* Generators to set the corresponding generate the coresponding arguments and yield the results */
export async function* benchmarkAdd(generateFunction, restFunction, gqlFunction, clearRest, clearGql) {
    const comment = generateFunction(1);
    let gen = benchmark({
            restFun: restFunction,
            argumentsRest: [comment]
        },
        {
            gqlFun: gqlFunction,
            argumentsGql: [comment]
        },
        // null,
        // {
        //     clearGqlFun: clearRest,
        //     clearRestFun: clearGql
        // }
    )
    for await (let value of gen) {
        yield value;
    }
}

export async function* benchmarkGetAll(restFun, gqlFun) {
    let gen = benchmark({
            restFun: restFun,
            argumentsRest: []
        },
        {
            gqlFun: gqlFun,
            argumentsGql: []
        })
    for await (let value of gen) {
        yield value;
    }
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

export async function * benchmarkUpdate(generateFunction, restFunction, gqlFunction) {
    const comment = generateFunction(1);
    const idRest = await addCommentRest(comment);
    const idGql = await addCommentGql(comment);
    comment.id = idRest;
    const commentRest = comment;
    comment.id = idGql;

    let gen = await benchmark({
            restFun: restFunction,
            argumentsRest: [idRest, commentRest]
        },
        {
            gqlFun: gqlFunction,
            argumentsGql: [...Object.values(comment)]
        });

    for await (let value of gen) {
        yield value;
    }

    // console.log(result);
    // await rest.deleteCommentRest(idRest);
    // await gql.deleteCommentGql(idGql);
    // console.log("Cleaned up the comments. All good!");
}

export async function* benchmarkDelete(generateFunction, restFunction, gqlFunction, restAuxFunction, gqlAuxFunction) {
    const object = generateFunction(1);
    let gen = benchmark({
            restFun: restFunction,
            argumentsRest: [object]
        },
        {
            gqlFun: gqlFunction,
            argumentsGql: [object]
        },
        {
            restAuxFun: restAuxFunction,
            gqlAuxFun: gqlAuxFunction
        })

    for await (let value of gen) {
        yield value;
    }
}

export async function* benchmarkBulkAdd(generateFunction, restFunction, gqlFunction, clearRest, clearGql) {
    const arg = generateFunction.name === 'generateComments' ? 1000 : 250;
    const objects = generateFunction(arg);
    let gen = benchmark({
            restFun: restFunction,
            argumentsRest: [objects]
        },
        {
            gqlFun: gqlFunction,
            argumentsGql: [objects]
        },
        null,
        // {
        //     clearGqlFun: clearGql,
        //     clearRestFun: clearRest
        // }
    )
    for await (let value of gen) {
        yield value;
    }
}

export async function* benchmarkBulkDelete(generateFunction, restFunction, gqlFunction, restAuxFunction, gqlAuxFunction) {
    const objects = generateFunction(5000);
    let gen = benchmark({
            restFun: restFunction,
            argumentsRest: [objects]
        },
        {
            gqlFun: gqlFunction,
            argumentsGql: [objects]
        },
        {
            restAuxFun: restAuxFunction,
            gqlAuxFun: gqlAuxFunction
        }
    )

    for await (let value of gen) {
        yield value;
    }
}

export async function* benchmarkUpdateNested(restFunction, gqlFunction) {
    const postRest = await getOnePostRest();
    const postGQL = await getOnePostGql();
    console.log("Rest", postRest, "gql", postGQL);
    let commToUpdateRest = postRest.comments[2];
    let commToUpdateGql = postGQL.comments[0];
    delete commToUpdateRest["timestamp"];
    delete commToUpdateGql["timestamp"];
    let gen = benchmark({
            restFun: restFunction,
            argumentsRest: [postRest.id, commToUpdateRest]
        },
        {
            gqlFun: gqlFunction,
            argumentsGql: [postGQL.id, ...Object.values(commToUpdateGql)]
        });

    for await (let value of gen) {
        yield value;
    }
}


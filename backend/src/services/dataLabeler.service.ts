
import { defaultPicture } from './../public/images/defaultPicture';
import { groupCollapsed } from 'console';
import { any } from 'sequelize/types/lib/operators';
import { Item } from './../models/useritem/item.model';
import {Op} from 'sequelize';

export class DataLabelCycle {
    public processToLabels(): void {
        Item.findAll({where: {
            [Op.and] : [{labeljson : ''}, , {encodedPicture: {[Op.ne]: defaultPicture.base64Value}}]}
             })
        .then(found => {
            if (found != null) {
                found.map(value => {
                    const {ClarifaiStub} = require('clarifai-nodejs-grpc');
                    const grpc = require('@grpc/grpc-js');

                    const stub = ClarifaiStub.grpc();
                    const metadata = new grpc.Metadata();
                    let finalName = '';

                    metadata.set('authorization', 'Key aecd8f90a99344c2a22014a94f4e0af5');

                    stub.PostModelOutputs(
                        {
                            model_id: 'aaa03c23b3724a16a56b629203edc62c',
                            inputs: [{data: {image: {base64: value.encodedPicture}}}]
                        },
                        metadata,
                        (err, response) => {
                            if (err) {
                                console.log('Error: ' + err);
                                return;
                            }

                            if (response.status.code !== 10000) {
                                console.log('Received failed status: ' + response.status.description + '\n' + response.status.details);
                                return;
                            }
                            for (const c of response.outputs[0].data.concepts) {
                                finalName += c.name + ' ';
                            }
                            const data = response.outputs[0].data.concepts.map(function(c) {
                                return {
                                    name : c.name
                                };
                            });
                            value.update({labeljson: finalName});
                        }
                    );
                });
            } else {
                console.log(found);
            }
        })
        .catch(err => console.log(err));
    }
}





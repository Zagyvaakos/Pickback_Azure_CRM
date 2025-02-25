import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { AzureTaskService } from './azure-task.service';
import { DestroyRef, inject } from '@angular/core';
import { withActivatedRouteData } from '../../../@core/utils/withActivatedRouteDataFeature';

const initialState = {
    isDetails: false,
    isLoading: false,
    model: {
        company: null,
        companyId: 0,
        createdUser: null,
        createdUserId: 0,
        createdDate: new Date(),
        createdDateUtc: new Date(),
        type: '',
        status: '',
        title: '',
        description: '',
        siteUrl: null,
        affectedVersion: null,
        fixedVersion: null,
        comments: [],
        attachments: [],
        id: 0,
    },
    validators: new Map([
        ['title', { required: true }],
        ['status', { required: true }],
        ['description', { required: true }],
    ]),
};

export const AzureTaskEditStore = signalStore(
    withState(initialState),
    withActivatedRouteData(),
    withComputed(({ model }) => ({})),

    withMethods((store,
        destroyRef = inject(DestroyRef)
    ) => {
        const azureTaskService = inject(AzureTaskService)
        return {
            patchModelWithPartial(value: Partial<any>): void {
                patchState(store, (state) => ({
                    model: {
                        ...state.model,
                        ...value,
                    },
                }));
            },
            patchModel(key: keyof any, value: any[keyof any] | undefined): void {


                patchState(store, (state) => ({
                    model: {
                        ...state.model,
                        [key]: value,
                    },
                }));
            },
            setModel(model: any): void {
                patchState(store, () => ({ model }));
            },


            fetchTask() {

            },

            saveTask() {

                let data = {
                    id: store.model.id(),
                    type: store.model.type(),
                    title: store.model.title(),
                    description: store.model.description(),

                };
                if (data.id === 0) {
                    azureTaskService.insertData(data).subscribe(response => {
                        // this.location.back();
                    });
                }
                else {
                    azureTaskService.updateData(data, data.id).subscribe(response => {
                        // this.location.back();
                    });
                }



            }
        }
    })
);


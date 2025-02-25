import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { AzureTaskService } from './azure-task.service';
import { DestroyRef, inject } from '@angular/core';
import { withActivatedRouteData } from '../../../@core/utils/withActivatedRouteDataFeature';

const initialState = {
    isLoading: false,
    model: {
        companyIds: [],
        createdUser: { id: 1 },
        limit: 10,
        offset: 1,
        sortDirection: "asc",
        sortField: null,
        statuses: [],
        text: null,
        types: [],
    }
}

export const AzureTaskListStore = signalStore(
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
                    companyIds: store.model.companyIds(),
                    createdUser: store.model.createdUser(),
                    limit: store.model.limit(),
                    offset: store.model.offset(),
                    sortDirection: store.model.sortDirection(),
                    sortField: store.model.sortField(),
                    statuses: store.model.statuses(),
                    text: store.model.text(),
                    types: store.model.types(),

                };
                console.log(data, 'data hehe')



            }
        }
    })
);


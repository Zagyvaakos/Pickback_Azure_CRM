import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { AzureTaskService } from '../../azure-task/data-access/azure-task.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { debounceTime, distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';

export interface Example {
    id: number;
    title?: string;
    name: string;
    description?: string;
    priority?: number;
    uuid?: string;
}

type ExamplesState = {
    examples: Example[];
    isLoading: boolean;
    filter: { query: string; order: 'asc' | 'desc' };
};

const initialState: ExamplesState = {
    examples: [],
    isLoading: false,
    filter: { query: '', order: 'asc' },
};

export const ExampleStore = signalStore(
    withState(initialState),
    withComputed(({ examples, filter }) => ({
        booksCount: computed(() => examples().length),
        sortedBooks: computed(() => {
            const direction = filter.order() === 'asc' ? 1 : -1;

            return examples().sort((a, b) =>
                direction * a.name.localeCompare(b.name)
            );
        }),
    })),
    withMethods((store) => ({
        updateQuery(query: string): void {
            patchState(store, (state) => ({ filter: { ...state.filter, query } }));
        },
        updateOrder(order: 'asc' | 'desc'): void {
            patchState(store, (state) => ({ filter: { ...state.filter, order } }));
        },
        addExample(example: Example): void {
            patchState(store, (state) => ({ examples: [...state.examples, example] }));
        },
        // async loadAllExamples(): Promise<void> {
        //     patchState(store, { isLoading: true });

        //     // const examples = await AzureTaskService.getAll();
        //     patchState(store, { examples, isLoading: false });
        // },
        // loadByQuery: rxMethod<string>(
        //     pipe(
        //         debounceTime(300),
        //         distinctUntilChanged(),
        //         tap(() => patchState(store, { isLoading: true })),
        //         switchMap((query) => {
        //             return booksService.getByQuery(query).pipe(
        //                 tapResponse({
        //                     next: (books) => patchState(store, { books, isLoading: false }),
        //                     error: (err) => {
        //                         patchState(store, { isLoading: false });
        //                         console.error(err);
        //                     },
        //                 })
        //             );
        //         })
        //     )
        // ),
    }))
);



import clsx from 'clsx';
import { mergeAndCompare } from 'merge-anything';
import { v4 } from 'uuid';
import {
    ChangeEvent,
    ComponentProps,
    KeyboardEvent,
    SyntheticEvent,
    useMemo,
    useState,
} from 'react';
import { Autocomplete, AutocompleteItem, Input } from '@ui-kitten/components';
import { css } from '@emotion/native';

import { spacing } from 'js/utils/spacing';
import { Chip } from 'js/components/common/Chip';

export type FacetedSearchRecord = {
    facet: string;
    value: string | string[];
};

export interface PropTypes extends Omit<ComponentProps<typeof Autocomplete>, 'onChange'> {
    ChipProps?: Partial<ComponentProps<typeof Chip>>;
    currentSearch: Record<string, FacetedSearchRecord>;
    facets: string[];
    InputProps?: Partial<ComponentProps<typeof Input>>;
    onChange: (newSearch: Record<string, FacetedSearchRecord>) => void;
}

function formatLabel(search: FacetedSearchRecord): string {
    return `${search.facet}: ${search.value}`;
}

function clearTextSearch(
    facetedSearch: Record<string, FacetedSearchRecord>,
    pendingFacet: string,
): Record<string, FacetedSearchRecord> {
    const newSearch = { ...facetedSearch };

    delete newSearch[pendingFacet];

    return newSearch;
}

function submitTextSearch(
    facetedSearch: Record<string, FacetedSearchRecord>,
    pendingFacet: string,
    textSearch: string,
): Record<string, FacetedSearchRecord> {
    const newSearch = { ...facetedSearch };

    newSearch[pendingFacet].value = textSearch;

    return newSearch;
}

const chipCss = css({
    marginRight: spacing(1),
});

export const FacetedSearch = (props: PropTypes): JSX.Element => {
    const {
        ChipProps = {},
        currentSearch,
        facets,
        InputProps = {},
        label,
        placeholder,
        onChange,
        ...rest
    } = props;
    const [pendingFacet, setPendingFacet] = useState<string>('');
    const [textSearch, setTextSearch] = useState<string>('');
    const searchKeys = useMemo(() => Object.keys(currentSearch), [currentSearch]);

    const clearAll = (): void => {
        onChange({});
        setPendingFacet('');
        setTextSearch('');
    };

    const handleClear = (): void => {
        onChange(clearTextSearch(currentSearch, pendingFacet));
        setPendingFacet('');
        setTextSearch('');
    };

    const handleChange = (
        event: ChangeEvent<any>,
        value: string | string[] | null,
        reason: AutocompleteChangeReason,
    ): void => {
        event.preventDefault();

        if (reason === 'clear') {
            clearAll();
        } else if ((event as KeyboardEvent).key !== 'Enter' && value) {
            const newSearch = { ...currentSearch };
            const valueArr = Array.isArray(value) ? value : [value];

            if (valueArr.length > Object.keys(newSearch).length) {
                const v = valueArr[valueArr.length - 1];
                const index = v4();

                newSearch[index] = {
                    facet: v,
                    value: '',
                };

                setPendingFacet(index);
            }

            onChange(newSearch);
        }
    };

    const handleDeleteFacetFactory = (key: string) => (event: SyntheticEvent): void => {
        event.preventDefault();

        const newSearch = { ...currentSearch };

        delete newSearch[key];

        onChange(newSearch);
    };

    const handleInputChange = (event: ChangeEvent<any>, value: string): void => {
        if (event) {
            event.preventDefault();

            switch ((event as KeyboardEvent).key) {
                case 'Enter':
                    onChange(submitTextSearch(currentSearch, pendingFacet, textSearch));
                    setPendingFacet('');
                    setTextSearch('');

                    break;
                case 'Cancel':
                case 'Clear':
                case 'Delete':
                case 'Escape':
                    handleClear();
                    break;
                default:
                    setTextSearch(value);
                    break;
            }
        }
    };

    const renderInput = (params: AutocompleteRenderInputParams): JSX.Element => {
        const textFieldProps = mergeAndCompare(
            (originVal, newVal, key) => {
                if (key === 'className') {
                    return clsx(originVal, newVal);
                }

                return newVal;
            },
            params,
            InputProps,
        );

        return (
            // @ts-ignore
            <Input
                variant="outlined"
                {...textFieldProps}
                label={label}
                placeholder={placeholder}
                onBlur={handleClear}
            />
        );
    };

    const renderTags = (): React.ReactNode => searchKeys.map((key): JSX.Element => {
        const search = currentSearch[key];

        return search.value
            ? (
                <Chip
                    label={formatLabel(search)}
                    style={chipCss}
                    tabIndex={-1}
                    variant="outlined"
                    {...ChipProps}
                    data-tag-index={key}
                    key={key}
                    onDelete={handleDeleteFacetFactory(key)}
                />
            )
            : (<span key={search.facet}>{`${search.facet}: `}</span>);
    });

    return (
        <Autocomplete {...rest}>
            {facets.map((facet) => (
                <AutocompleteItem key={facet} title={facet} />
            ))}
        </Autocomplete>
    );
};

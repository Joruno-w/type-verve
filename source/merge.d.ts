import type {OmitIndexSignature} from './omit-index-signature.js';
import type {PickIndexSignature} from './pick-index-signature.js';
import type {EnforceOptional} from './enforce-optional.js';

/**
Merge two types into a new type. Keys of the second type overrides keys of the first type.

@example
```
import type {Merge} from 'type-verve';

interface Foo {
	[x: string]: unknown;
	[x: number]: unknown;
	foo: string;
	bar: symbol;
}

type Bar = {
	[x: number]: number;
	[x: symbol]: unknown;
	bar: Date;
	baz: boolean;
};

export type FooBar = Merge<Foo, Bar>;
// => {
// 	[x: string]: unknown;
// 	[x: number]: number;
// 	[x: symbol]: unknown;
// 	foo: string;
// 	bar: Date;
// 	baz: boolean;
// }
```

@category Object
*/
export type Merge<Destination, Source> = EnforceOptional<{
	[Key in keyof OmitIndexSignature<Destination> | keyof OmitIndexSignature<Source>]: Key extends keyof Source
		? Source[Key]
		: Key extends keyof Destination
			? Destination[Key]
			: never;
} & PickIndexSignature<Destination> & PickIndexSignature<Source>>;

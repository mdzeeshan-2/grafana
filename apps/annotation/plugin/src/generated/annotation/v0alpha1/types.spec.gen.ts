// Code generated - EDITING IS FUTILE. DO NOT EDIT.

export interface Spec {
	text: string;
	time: number;
	timeEnd?: number;
	dashboardUID?: string;
	panelID?: number;
	tags?: string[];
	tagsMatchAny?: boolean;
	scopes?: string[];
	scopesMatchAny?: boolean;
}

export const defaultSpec = (): Spec => ({
	text: "",
	time: 0,
});


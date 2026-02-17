package kinds

annotationv0alpha1: {
	kind:       "Annotation"
  pluralName: "Annotations"
	schema: {
		spec: {
			text: string
      time: int64
      timeEnd?: int64
      dashboardUID?: string
      panelID?: int64
      tags?: [...string]
      tagsMatchAny?: bool
      scopes?: [...string]
      scopesMatchAny?: bool
		}
	}
  selectableFields: [
    "spec.time",
    "spec.timeEnd",
    "spec.dashboardUID",
    "spec.panelID",
    "spec.tags",
    "spec.tagsMatchAny",
    "spec.scopes",
    "spec.scopesMatchAny",
  ]
}


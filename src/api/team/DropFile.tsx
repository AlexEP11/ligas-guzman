export default function DropFile() {
    return (
        <div
            data-file-upload={JSON.stringify({
                url: "/upload",
                acceptedFiles: "image/*",
                autoHideTrigger: false,
                extensions: {
                    csv: {
                        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="m5 12-3 3 3 3"/><path d="m9 18 3-3-3-3"/></svg>`,
                        class: "shrink-0 size-5",
                    },
                },
            })}
        >
            <template data-file-upload-preview="">
                <div className="relative mt-2 rounded-box shadow-md bg-base-100 p-2">
                    <img className="mb-2 w-full rounded-lg object-cover" data-dz-thumbnail="" alt="Preview" />
                    <div className="mb-1 flex items-center justify-between gap-x-3">
                        <div className="w-10">
                            <span className="text-base-content/90 mb-0.5 text-sm ellipsis" data-file-upload-name="">
                                {/* Aquí irá el nombre del archivo */}
                                Example-very-long-file-name-to-test-the-overflow.jpg
                            </span>
                        </div>
                        <div className="flex items-center gap-x-2">
                            <button type="button" className="btn btn-sm btn-circle btn-text" data-file-upload-remove="">
                                <span className="icon-[tabler--trash] size-4 shrink-0"></span>
                            </button>
                        </div>
                    </div>
                    <div
                        className="progress h-2"
                        role="progressbar"
                        aria-valuenow={0}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        data-file-upload-progress-bar=""
                    >
                        <div
                            className="progress-bar progress-primary file-upload-complete:progress-success transition-all duration-500"
                            style={{ width: "0%" }}
                            data-file-upload-progress-bar-pane=""
                        ></div>
                    </div>
                </div>
            </template>

            <div
                className="border-base-content/20 bg-base-100 rounded-box flex cursor-pointer justify-center border border-dashed p-12"
                data-file-upload-trigger=""
            >
                <div className="text-center">
                    <span className="bg-base-200/80 text-base-content/90 inline-flex size-16 items-center justify-center rounded-full">
                        <span className="icon-[tabler--upload] size-6 shrink-0"></span>
                    </span>
                    <div className="mt-4 flex flex-wrap justify-center">
                        <span className="text-base-content/90 pe-1 text-base font-medium">Drop your file here or</span>
                        <span className="link link-animated link-primary font-semibold">browse</span>
                    </div>
                    <p className="text-base-content/50 mt-1 text-xs">Pick a file up to 2MB.</p>
                </div>
            </div>
            <div
                className="mt-5  grid grid-cols-4 gap-2 empty:gap-0 max-sm:grid-cols-2"
                data-file-upload-previews=""
            ></div>
        </div>
    );
}

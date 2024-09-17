if (typeof wp.blockEditor !== 'undefined') {
    const {registerBlockType} = wp.blocks;
    const {__} = wp.i18n;
    const {useState, useEffect} = wp.element;
    const apiFetch = wp.apiFetch;
    const {InspectorControls} = wp.blockEditor;
    const {PanelBody, ToggleControl, SelectControl, RangeControl, Placeholder, Spinner} = wp.components;

    // Register the block
    registerBlockType('obf/badges-block', {
        title: __('User Badges', 'obf'),
        icon: 'awards',
        category: 'widgets',
        attributes: {
            layout: {type: 'string', default: 'grid'},
            showBadgeName: {type: 'boolean', default: true},
            showBadgeImage: {type: 'boolean', default: true},
            columns: {type: 'number', default: 3},
        },
        edit({attributes, setAttributes}) {
            const {layout, showBadgeName, showBadgeImage, columns} = attributes;
            const [badges, setBadges] = useState(null);
            const [loading, setLoading] = useState(true);

            useEffect(() => {
                apiFetch({path: '/obf-pws/v1/user-badges'}).then((data) => {
                    if (data && data.badges) {
                        setBadges(data.badges);
                    } else {
                        setBadges([]); // No badges
                    }
                    setLoading(false);
                }).catch((error) => {
                    console.error('Error fetching badges:', error);
                    setBadges([]); // Handle errors
                    setLoading(false);
                });
            }, []);

            if (loading) {
                return <Placeholder><Spinner/></Placeholder>;
            }

            return (
                <>
                    <InspectorControls>
                        <PanelBody title={__('Display Settings', 'obf')}>
                            <SelectControl
                                label={__('Layout', 'obf')}
                                value={layout}
                                options={[
                                    {label: 'Grid', value: 'grid'},
                                    {label: 'Table', value: 'table'},
                                    {label: 'List', value: 'list'},
                                ]}
                                onChange={(newLayout) => setAttributes({layout: newLayout})}
                            />
                            <ToggleControl
                                label={__('Show Badge Name', 'obf')}
                                checked={showBadgeName}
                                onChange={(value) => setAttributes({showBadgeName: value})}
                            />
                            <ToggleControl
                                label={__('Show Badge Image', 'obf')}
                                checked={showBadgeImage}
                                onChange={(value) => setAttributes({showBadgeImage: value})}
                            />
                            {layout === 'grid' && (
                                <RangeControl
                                    label={__('Columns', 'obf')}
                                    value={columns}
                                    onChange={(newColumns) => setAttributes({columns: newColumns})}
                                    min={1}
                                    max={5}
                                />
                            )}
                        </PanelBody>
                    </InspectorControls>
                    <div className={`obf-badges-block ${layout}`}>
                        {badges && badges.length > 0 ? (
                            badges.map((badge) => (
                                <div className="badge-item" key={badge.id}>
                                    {showBadgeImage && <img src={badge.image} alt={badge.name}/>}
                                    {showBadgeName && <span>{badge.name}</span>}
                                </div>
                            ))
                        ) : (
                            <p>{__('No badges available.', 'obf')}</p>
                        )}
                    </div>
                </>
            );
        },
        save() {
            return null; // Dynamic rendering in PHP
        },
    });
}

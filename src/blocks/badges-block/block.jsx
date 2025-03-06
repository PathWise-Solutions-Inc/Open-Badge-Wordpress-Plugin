if (typeof wp.blockEditor !== 'undefined') {
    const { registerBlockType, getBlockType } = wp.blocks;
    const { __ } = wp.i18n;
    const { useState, useEffect } = wp.element;
    const apiFetch = wp.apiFetch;
    const { InspectorControls } = wp.blockEditor;
    const { PanelBody, ToggleControl, SelectControl, RangeControl, Placeholder, Spinner, TextControl } = wp.components;

    // Check if the block is already registered
    if (!getBlockType('pbc/badges-block')) {
        // Register the block
        registerBlockType('pbc/badges-block', {
            title: __('User Badges', 'pathwise-badge-connect'),
            icon: 'awards',
            category: 'widgets',
            attributes: {
                layout: { type: 'string', default: 'grid' },
                showBadgeName: { type: 'boolean', default: true },
                showBadgeImage: { type: 'boolean', default: true },
                columns: { type: 'number', default: 3 },
                imageWidth: { type: 'string', default: '100%' },
                imageMaxWidth: { type: 'string', default: '450px' },
            },
            edit({ attributes, setAttributes }) {
                const { layout, showBadgeName, showBadgeImage, columns, imageWidth, imageMaxWidth } = attributes;
                const [badges, setBadges] = useState(null);
                const [loading, setLoading] = useState(true);

                useEffect(() => {
                    apiFetch({ path: '/pathwise-badge-connect/v1/user-badges' })
                        .then((data) => {
                            if (data && data.badges) {
                                setBadges(data.badges);
                            } else {
                                setBadges([]); // No badges
                            }
                            setLoading(false);
                        })
                        .catch((error) => {
                            console.error('Error fetching badges:', error);
                            setBadges([]); // Handle errors
                            setLoading(false);
                        });
                }, []);

                if (loading) {
                    return <Placeholder><Spinner /></Placeholder>;
                }

                return (
                    <>
                        <InspectorControls>
                            <PanelBody title={__('Display Settings', 'pathwise-badge-connect')}>
                                <SelectControl
                                    label={__('Layout', 'pathwise-badge-connect')}
                                    value={layout}
                                    options={[
                                        { label: 'Grid', value: 'grid' },
                                        { label: 'Table', value: 'table' },
                                        { label: 'List', value: 'list' },
                                    ]}
                                    onChange={(newLayout) => setAttributes({ layout: newLayout })}
                                />
                                <ToggleControl
                                    label={__('Show Badge Name', 'pathwise-badge-connect')}
                                    checked={showBadgeName}
                                    onChange={(value) => setAttributes({ showBadgeName: value })}
                                />
                                <ToggleControl
                                    label={__('Show Badge Image', 'pathwise-badge-connect')}
                                    checked={showBadgeImage}
                                    onChange={(value) => setAttributes({ showBadgeImage: value })}
                                />
                                {(layout === 'grid' || layout === 'table') && (
                                    <RangeControl
                                        label={__('Columns', 'pathwise-badge-connect')}
                                        value={columns}
                                        onChange={(newColumns) => setAttributes({ columns: newColumns })}
                                        min={1}
                                        max={5}
                                    />
                                )}
                                {showBadgeImage && (
                                    <>
                                        <TextControl
                                            label={__('Image Width', 'pathwise-badge-connect')}
                                            value={imageWidth}
                                            onChange={(value) => setAttributes({ imageWidth: value })}
                                            help={__('Set the width of the badge image (e.g., 100%, 200px).')}
                                        />
                                        <TextControl
                                            label={__('Image Max Width', 'pathwise-badge-connect')}
                                            value={imageMaxWidth}
                                            onChange={(value) => setAttributes({ imageMaxWidth: value })}
                                            help={__('Set the maximum width of the badge image (e.g., 450px).')}
                                        />
                                    </>
                                )}
                            </PanelBody>
                        </InspectorControls>
                        {layout === 'grid' && (
                            <div className={`pbc-badges-block grid`} style={{ '--columns': columns }}>
                                {badges && badges.length > 0 ? (
                                    badges.map((badge) => (
                                        <div className="badge-item" key={badge.id}>
                                            {showBadgeImage && (
                                                <img
                                                    src={badge.image}
                                                    alt={badge.name}
                                                    style={{ width: imageWidth, maxWidth: imageMaxWidth }}
                                                />
                                            )}
                                            {showBadgeName && <span>{badge.name}</span>}
                                        </div>
                                    ))
                                ) : (
                                    <p>{__('No badges available.', 'pathwise-badge-connect')}</p>
                                )}
                            </div>
                        )}
                        {layout === 'table' && (
                            <table className="pbc-badges-block table" style={{'--columns': columns}}>
                                <tbody>
                                {badges && badges.length > 0 ? (
                                    badges.map((badge, index) => {
                                        // Determine if we need to start a new row
                                        const startNewRow = index % columns === 0;
                                        const endRow = (index + 1) % columns === 0 || index === badges.length - 1;

                                        return (
                                            <>
                                                {startNewRow && <tr key={`row-start-${index}`}/>}
                                                <td className="badge-item" key={index}>
                                                    {showBadgeImage && (
                                                        <img
                                                            src={badge.image}
                                                            alt={badge.name}
                                                            style={{width: imageWidth, maxWidth: imageMaxWidth}}
                                                        />
                                                    )}
                                                    {showBadgeName && <span>{badge.name}</span>}
                                                </td>
                                                {endRow && <tr key={`row-end-${index}`}/>}
                                            </>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td>{__('No badges available.', 'pathwise-badge-connect')}</td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        )}
                        {layout === 'list' && (
                            <ul className="pbc-badges-block list">
                                {badges && badges.length > 0 ? (
                                    badges.map((badge, index) => (
                                        <li className="badge-item" key={index}>
                                            {showBadgeImage && (
                                                <img
                                                    src={badge.image}
                                                    alt={badge.name}
                                                    style={{width: imageWidth, maxWidth: imageMaxWidth}}
                                                />
                                            )}
                                            {showBadgeName && <span>{badge.name}</span>}
                                        </li>
                                    ))
                                ) : (
                                    <li>{__('No badges available.', 'pathwise-badge-connect')}</li>
                                )}
                            </ul>
                        )}
                    </>
                );
            },
            save() {
                return null; // Dynamic rendering in PHP
            },
        });
    }
}

<?php 
/**
 * Custom Fields for Service Plan
 */
if( function_exists('acf_add_local_field_group') ):

    acf_add_local_field_group(array(
        'key' => 'group_5d4be493327f6',
        'title' => 'Service Plan Price',
        'fields' => array(
            array(
                'key' => 'field_5d4be4b215c49',
                'label' => 'Price',
                'name' => 'price',
                'type' => 'number',
                'instructions' => 'Insert service plan number',
                'required' => 1,
                'conditional_logic' => 0,
                'wrapper' => array(
                    'width' => '',
                    'class' => '',
                    'id' => '',
                ),
                'default_value' => 0,
                'placeholder' => 'insert service price',
                'prepend' => '',
                'append' => '',
                'min' => '',
                'max' => '',
                'step' => '',
            ),
        ),
        'location' => array(
            array(
                array(
                    'param' => 'post_type',
                    'operator' => '==',
                    'value' => 'fa_service_plan',
                ),
            ),
        ),
        'menu_order' => 0,
        'position' => 'normal',
        'style' => 'default',
        'label_placement' => 'top',
        'instruction_placement' => 'label',
        'hide_on_screen' => '',
        'active' => 1,
        'description' => '',
    ));
    
    acf_add_local_field_group(array(
        'key' => 'group_5d4be825e22a7',
        'title' => 'Service Type',
        'fields' => array(
            array(
                'key' => 'field_5d4be82ff8bef',
                'label' => 'Type',
                'name' => 'type',
                'type' => 'select',
                'instructions' => 'Select type',
                'required' => 1,
                'conditional_logic' => 0,
                'wrapper' => array(
                    'width' => '',
                    'class' => '',
                    'id' => '',
                ),
                'choices' => array(
                    'plan' => 'Plan',
                    'addon' => 'Add-on',
                ),
                'default_value' => array(
                    0 => 'plan',
                ),
                'allow_null' => 0,
                'multiple' => 0,
                'ui' => 0,
                'return_format' => 'value',
                'ajax' => 0,
                'placeholder' => '',
            ),
        ),
        'location' => array(
            array(
                array(
                    'param' => 'post_type',
                    'operator' => '==',
                    'value' => 'fa_service_plan',
                ),
            ),
        ),
        'menu_order' => 0,
        'position' => 'normal',
        'style' => 'default',
        'label_placement' => 'top',
        'instruction_placement' => 'label',
        'hide_on_screen' => '',
        'active' => 1,
        'description' => '',
    ));
    
endif;